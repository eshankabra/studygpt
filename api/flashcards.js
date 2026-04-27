console.log("Loaded Key:", process.env.GEMINI_API_KEY);

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
- Generate 5–8 flashcards
- Each must have:
  - "question"
  - "answer"
- Keep answers short and clear
- Return ONLY a JSON array
- DO NOT include markdown or explanation

Format:
[
  { "question": "...", "answer": "..." }
]

Notes:
${notes}
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
            contents: [{ parts: [{ text: prompt }] }],
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

    // retry logic
    for (let i = 0; i < 3; i++) {
      try {
        data = await callGemini(prompt);
        break;
      } catch (err) {
        if (i === 2) throw err;
        await new Promise((r) => setTimeout(r, 1000));
      }
    }

    let text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "[]";

    // 🔥 CLEAN RESPONSE
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let cards;

    try {
      cards = JSON.parse(text);
    } catch (err) {
      console.error("JSON parse failed:", text);

      // fallback
      cards = [
        { question: "Fallback Question", answer: "Fallback Answer" }
      ];
    }

    // add IDs
    cards = cards.map((card, i) => ({
      id: Date.now() + i,
      ...card,
      status: "new",
    }));

    return res.status(200).json({ cards });

  } catch (error) {
    console.error("Flashcard error:", error);

    return res.status(200).json({
      cards: [
        { id: 1, question: "Error", answer: "Try again later", status: "new" }
      ],
    });
  }
}