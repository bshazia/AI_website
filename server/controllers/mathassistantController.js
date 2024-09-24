const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.askMathTeacher = async (req, res) => {
  const { question,level } = req.body;

  try {
    // Define the behavior of the assistant
      const prompt = `
        You are a math teacher for ${level} students. 
        Explain the following math problem and guide them step-by-step on how to solve it:
        Problem: ${question}
      `;


    // Use the model to generate a response
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo", // Specify the model here
      messages: [{ role: "user", content: prompt }],
    });

    res.json({ answer: response.choices[0].message.content.trim() });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Something went wrong", details: error.message });
  }
};
