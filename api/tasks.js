console.log("Loaded Key:", process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "No input provided" });
    }

    const prompt = `
Convert the following into a structured task list.

Return ONLY a JSON array like:
[
  { "task": "Task name", "priority": "High/Medium/Low", "time": "1h" }
]

DO NOT include any explanation or markdown.

Input:
${text}
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
        throw new Error("Gemini failed");
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
        await new Promise((res) => setTimeout(res, 1000));
      }
    }

    let textOutput =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "[]";

    // clean markdown if present
    textOutput = textOutput
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let tasks;

    try {
      tasks = JSON.parse(textOutput);
    } catch (err) {
      console.error("JSON parse failed:", textOutput);

      // fallback if parsing fails
      tasks = [
        { task: "Study", priority: "High", time: "1h" }
      ];
    }

    return res.status(200).json({ tasks });

  } catch (error) {
    console.error("Tasks API error:", error);

    return res.status(200).json({
      tasks: [
        { task: "Fallback Task", priority: "Medium", time: "1h" }
      ]
    });
  }
}