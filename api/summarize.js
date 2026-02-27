console.log("Loaded Key:", process.env.GEMINI_API_KEY);
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { notes, length } = req.body;

    if (!notes) {
      return res.status(400).json({ error: "No notes provided" });
    }

    let wordLimit;

    if (length === "short") {
      wordLimit = "100 words maximum";
    } else if (length === "medium") {
      wordLimit = "200 words maximum";
    } else {
      wordLimit = "400 words maximum";
    }

    const prompt = `
You are an expert academic summarizer.

Summarize the notes below in ${wordLimit}.
Be concise.
Do NOT exceed the word limit.
Use clear bullet points.

Notes:
${notes}
`;

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
      return res.status(500).json({ error: "Gemini API failed" });
    }

    const summary =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No summary generated.";

    return res.status(200).json({ summary });

  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}