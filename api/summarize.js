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
      wordLimit = "50-100 words maximum";
    } else if (length === "medium") {
      wordLimit = "100-200 words maximum";
    } else {
      wordLimit = "200-400 words maximum";
    }

    const prompt = `
You are an expert academic summarizer.

Summarize the notes below in ${wordLimit}.
Be concise.
Do NOT exceed the word limit.
Use clear bullet points.
Make sure the word limit is not more than three-fourth of the original message

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

    for (let i = 0; i < 3; i++) {
      try {
        data = await callGemini(prompt);
        break; // success → exit loop
      } catch (err) {
        console.log(`Retry ${i + 1} failed`);

        if (i === 2) throw err; // after 3 tries → fail

        await new Promise(res => setTimeout(res, 1000)); // wait 1 sec
      }
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