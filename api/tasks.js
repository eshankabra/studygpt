export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text } = req.body;

    const prompt = `
Convert this into a structured task list.

Return ONLY JSON:
[
  { "task": "...", "priority": "...", "time": "..." }
]

Input:
${text}
`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();

    let textOutput =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "[]";

    textOutput = textOutput.replace(/```json|```/g, "").trim();

    const tasks = JSON.parse(textOutput);

    res.status(200).json({ tasks });

  } catch (err) {
    console.error(err);

    res.status(200).json({
      tasks: [
        { task: "Fallback Task", priority: "Medium", time: "1h" }
      ]
    });
  }
}