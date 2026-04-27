console.log("Loaded Key:", process.env.GEMINI_API_KEY);

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

Explain the answer clearly and simply like a teacher.

IMPORTANT RULES:
- Keep the answer within 150–200 words
- Use bullet points or short paragraphs
- Be complete but concise
- Do NOT give overly long explanations
- Do NOT use bold formatting (no **text**).
- You may use bullet points using - or *.

Question:
${message}
`;

    async function callGemini(prompt) {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=" +
          process.env.GEMINI_API_KEY,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Gemini error:", data);
        throw new Error(data?.error?.message || "Gemini failed");
      }

      return data;
    }

    let data;

    // retry logic (same as summarizer)
    for (let i = 0; i < 3; i++) {
      try {
        data = await callGemini(prompt);
        break;
      } catch (err) {
        console.log(`Retry ${i + 1} failed`);

        if (i === 2) throw err;

        await new Promise((res) => setTimeout(res, 1000));
      }
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response generated.";

    return res.status(200).json({ reply });

  } catch (error) {
    console.error("Tutor API error:", error);

    return res.status(200).json({
      reply: "⚠️ AI is currently unavailable. Try again later."
    });
  }
}