const fetch = require("node-fetch");
const { getDocumentText } = require("./uploadController");

exports.askQuestion = async (req, res) => {
  try {
    const { question } = req.body;
    const documentText = getDocumentText();

    if (!documentText) {
      return res.status(400).json({
        error: "No document uploaded."
      });
    }

    // optional: limit document size
    const limitedText = documentText.slice(0, 30000);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Answer ONLY from this document.
If not found say "Not found in document."

Document:
${limitedText}

Question:
${question}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("Gemini Response:", data);

    const answer =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      data?.error?.message ||
      "No response from Gemini";

    res.json({ answer });

  } catch (error) {
    console.log("GEMINI ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};
