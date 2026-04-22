export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message, subject } = req.body;

    if (!message) {
      return res.status(400).json({ error: "No message provided" });
    }

    const prompt = `
You are an expert ${subject} tutor.

Explain clearly and simply like a teacher.
Keep it structured and easy to understand.

Question:
${message}
`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini error:", data);
      throw new Error("Gemini failed");
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated.";

    return res.status(200).json({ reply });

  } catch (error) {
    console.error("Tutor API error:", error);

    // fallback (important for quota)
    return res.status(200).json({
      reply: "⚠️ AI is currently unavailable. Try again later."
    });
  }
}