export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { notes } = req.body;

    if (!notes) {
      return res.status(400).json({ error: "No notes provided" });
    }

    const prompt = `
You are an AI study assistant.

Convert the following notes into flashcards.

Rules:
- Generate 5–10 flashcards
- Each flashcard must have:
  - question
  - answer
- Keep answers concise
- Return ONLY JSON (no explanation)

Format:
[
  { "question": "...", "answer": "..." },
  { "question": "...", "answer": "..." }
]

Notes:
${notes}
`;

    // 🔁 Retry logic (same as summarizer)
    async function callGemini(prompt) {
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
        throw new Error(data?.error?.message || "Gemini failed");
      }

      return data;
    }

    let data;

    for (let i = 0; i < 3; i++) {
      try {
        data = await callGemini(prompt);
        break;
      } catch (err) {
        if (i === 2) throw err;
        await new Promise(r => setTimeout(r, 1000));
      }
    }

    let text =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "[]";

    // 🧠 IMPORTANT: Clean response (LLMs sometimes add junk)
    text = text.replace(/```json|```/g, "").trim();

    let cards = JSON.parse(text);

    // add IDs
    cards = cards.map((card, i) => ({
      id: Date.now() + i,
      ...card,
      status: "new"
    }));

    return res.status(200).json({ cards });

  } catch (error) {
    console.error("Flashcard error:", error);
    return res.status(500).json({ error: "Failed to generate flashcards" });
  }
}