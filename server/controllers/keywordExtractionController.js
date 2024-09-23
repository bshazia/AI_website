const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

   
exports.extractKeywords = async (req, res) => {
  const { text } = req.body;

  try {
     const response = await openai.chat.completions.create({
       model: "gpt-3.5-turbo",
       messages: [
         {
           role: "user",
           content: `Extract keywords from the following text:\n\n${text}`,
         },
       ],
     });

    const keywords = response.choices[0].message.content.trim();
    res.status(200).json({ keywords });
  } catch (error) {
    console.error("Error extracting keywords:", error);
    res.status(500).json({ error: "Error extracting keywords" });
  }
};
