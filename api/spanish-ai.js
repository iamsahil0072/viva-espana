
import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Gemini API key is not configured."
    });
  }

  try {
    const { message, history = [] } = req.body || {};

    if (
      typeof message !== "string" ||
      !message.trim() ||
      message.length > 4000
    ) {
      return res.status(400).json({
        error: "Please enter a message under 4000 characters."
      });
    }

    const safeHistory = Array.isArray(history)
      ? history.slice(-10).filter(
          item =>
            ["user", "model"].includes(item.role) &&
            typeof item.text === "string"
        )
      : [];

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        ...safeHistory.map(item => ({
          role: item.role,
          parts: [{ text: item.text.slice(0, 4000) }]
        })),
        {
          role: "user",
          parts: [{ text: message.trim() }]
        }
      ],
      config: {
        systemInstruction:
          "You are a friendly Spanish language tutor. " +
          "Help beginners learn Spanish. Explain grammar clearly, " +
          "correct mistakes kindly, provide English meanings, " +
          "and give simple examples. Keep answers focused on learning."
      }
    });

    return res.status(200).json({
      reply: response.text || "Please try asking another question."
    });

  } catch (error) {
    console.error("Spanish AI error:", error);

    return res.status(500).json({
      error: "The Spanish tutor could not respond. Please try again."
    });
  }
}
