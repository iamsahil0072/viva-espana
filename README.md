# ¡Viva España! — React tourism & culture website

A responsive multi-page Spanish project website built with React, Vite, React Router and plain CSS.

## Pages
- Home — editorial tourism landing page
- Explore — searchable city directory and individual city detail pages
- Culture — art, flamenco, heritage and languages
- Cuisine — Spanish food gallery
- Festivals — major celebrations
- Learn Spanish — phrasebook with browser speech and an interactive five-question quiz
- About — project introduction and editable student details

## Run locally

1. Install Node.js (LTS).
2. Open this folder in VS Code or a terminal.
3. Run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL printed by Vite (usually http://localhost:5173).

## Production build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

Import the project folder/repository into Vercel. Vercel should detect Vite automatically.
- Build command: `npm run build`
- Output directory: `dist`

## Customise
- Edit the student details in `src/pages/About.jsx`.
- Edit city, food and festival content in `src/data.js`.
- Main styles are in `src/styles.css`.
- Images are remote Unsplash image URLs, so an internet connection is needed to load them.

## Notes
The language toggle and theme toggle are included in the navigation. The theme toggle switches between light and dark mode. The language button is a visual language selector in this starter version; page translations are currently written in English with Spanish vocabulary and phrases in the learning section.
