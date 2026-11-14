import { attractions } from '../src/attractions.js';
import fs from 'node:fs/promises';
import path from 'node:path';

const OUT = path.resolve('public/images');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const slug = value => normalize(value).replace(/\s+/g, '-');
const stop = new Set(['the','of','and','de','del','la','el','los','las','y','a','in','museum','gardens','quarter']);
const bad = /logo|coat of arms|crest|flag|map|icon|poster|plan|drawing|diagram|svg/i;
const allowed = /CC BY|CC0|Public domain|Public Domain|CC Zero|GFDL/i;

async function commonsSearch(place, city) {
  const params = new URLSearchParams({
    action:'query', generator:'search', gsrsearch:`"${place}" "${city}" Spain`,
    gsrnamespace:'6', gsrlimit:'18', prop:'imageinfo',
    iiprop:'url|extmetadata', iiurlwidth:'1100', format:'json', origin:'*'
  });
  const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`, {
    headers:{'User-Agent':'VivaEspanaLandmarkPhotoImporter/1.0 (educational website)'}
  });
  if (!response.ok) throw new Error(`Commons API HTTP ${response.status}`);
  const data = await response.json();
  return Object.values(data.query?.pages || {});
}
function score(title, place, city) {
  const titleWords = new Set(normalize(title).split(' '));
  const words = normalize(place).split(' ').filter(w => w.length > 2 && !stop.has(w));
  const cityWords = normalize(city).split(' ').filter(w => w.length > 2);
  const hits = words.filter(w => titleWords.has(w)).length;
  const cityHits = cityWords.filter(w => titleWords.has(w)).length;
  return { hits, total:words.length, score:hits*5+cityHits };
}
await fs.mkdir(OUT,{recursive:true});
const used = new Set(), manifest = {}, attribution = [], missing = [];
for (const [city, places] of Object.entries(attractions)) {
  for (const [place] of places) {
    const key = `${city}|${place}`, id = `${slug(city)}-${slug(place)}`;
    const pages = await commonsSearch(place,city);
    const candidates = pages.map(page => {
      const info = page.imageinfo?.[0], title = page.title || '', meta = info?.extmetadata || {};
      const licence = meta.LicenseShortName?.value || meta.License?.value || '';
      const s = score(title.replace(/^File:/,''),place,city);
      return {title,info,meta,licence,...s};
    }).filter(x => x.info?.thumburl && !bad.test(x.title) && !used.has(x.title) &&
      allowed.test(x.licence) && x.hits >= Math.max(1,Math.ceil(x.total*0.6)));
    candidates.sort((a,b)=>b.score-a.score);
    const chosen = candidates[0];
    if (!chosen) { missing.push(key); continue; }
    const response = await fetch(chosen.info.thumburl,{headers:{'User-Agent':'VivaEspanaLandmarkPhotoImporter/1.0'}});
    if (!response.ok) { missing.push(key); continue; }
    const bytes = Buffer.from(await response.arrayBuffer());
    const mime = response.headers.get('content-type') || '';
    const ext = mime.includes('png') ? 'png' : mime.includes('webp') ? 'webp' : mime.includes('gif') ? 'gif' : 'jpg';
    const filename = `${id}.${ext}`;
    await fs.writeFile(path.join(OUT,filename),bytes);
    used.add(chosen.title);
    manifest[key] = `/images/${filename}`;
    attribution.push({
      city, attraction:place, file:chosen.title.replace(/^File:/,''), author:chosen.meta.Artist?.value || 'Author not listed',
      license:chosen.licence, licenseUrl:chosen.meta.LicenseUrl?.value || '',
      sourcePage:chosen.info.descriptionurl || `https://commons.wikimedia.org/wiki/${encodeURIComponent(chosen.title.replace(/ /g,'_'))}`
    });
    console.log(`Downloaded ${key} -> ${filename}`);
    await delay(350);
  }
}
if (missing.length) {
  console.error(`Could not find ${missing.length} unique, suitably licensed images:`,missing.join('; '));
  process.exit(2);
}
await fs.writeFile('src/landmarkImages.js',`export const landmarkImages = ${JSON.stringify(manifest,null,2)};\n`);
await fs.writeFile(path.join(OUT,'ATTRIBUTION.json'),JSON.stringify(attribution,null,2));
console.log(`Successfully downloaded ${attribution.length} unique landmark photos.`);
