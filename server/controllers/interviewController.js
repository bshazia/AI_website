// server/controllers/interviewController.js
const OpenAI = require("openai");
const Feedback = require("../models/feedbackModel");
const openai = new OpenAI();

const interviewQuestions = [
  "Tell me about yourself.",
  "Why do you want to work here?",
  "What are your strengths and weaknesses?",
  // Add more questions as needed...
];

// Controller to get interview questions
const getInterviewQuestions = (req, res) => {
  res.json(interviewQuestions);
};


const getInterviewFeedback = async (req, res) => {
        const { response, question } = req.body;
        const userId = req.user.id; 

       // Log full incoming request for debugging
  console.log("Full request body:", req.body);
  console.log("Response received:", response);
  console.log("Question received:", question);
  console.log("User ID received:", userId);
   if (!response || !question || !userId) {
     console.error("Missing required parameters to save feedback.");
     return res.status(400).json({ error: "Missing required parameters." });
   }
        try {
              // Construct the messages for the chat model
              const messages = [
                {
                  role: "user",
                  content: `Analyze this interview response: ${response} for the question: "${question}". Provide constructive feedback.`,
                },
              ];

              const aiFeedback = await openai.chat.completions.create({
                model: "gpt-4",
                messages: messages,
                max_tokens: 200,
              });

              const feedbackText = aiFeedback.choices[0].message.content;
               const formattedFeedback = `
                Question: ${question}\n
                Response: ${response}\n
                Feedback:\n
                ${feedbackText}
                `;
              // Validate parameters before saving
              if (
                !userId ||
                !question ||
                !response ||
                feedbackText === undefined
              ) {
                console.error("Missing required parameters to save feedback.");
                return res
                  .status(400)
                  .json({ error: "Missing required parameters." });
              }

              // Save feedback to history
              await Feedback.saveFeedbackToHistory(
                userId,
                question,
                response,
                formattedFeedback
              ); 

            
              res.json({ feedback: formattedFeedback });
            } catch (error) {
          console.error("Error generating feedback:", error);
          res.status(500).json({ error: "Failed to analyze the response." });
        }
      };;;;

module.exports = {
  getInterviewQuestions,
  getInterviewFeedback,
};
