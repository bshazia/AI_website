const pool = require("../config/db"); 

const Feedback = {
  saveFeedbackToHistory: async (userId, question, response, feedback) => {
    try {
      const query = `INSERT INTO feedback_history (user_id, question, response, feedback) VALUES (?, ?, ?, ?)`;
      const [results] = await pool.execute(query, [
        userId,
        question,
        response,
        feedback,
      ]);
      return results;
    } catch (error) {
      throw new Error(`Error saving feedback: ${error.message}`);
    }
  },

  getFeedbackHistory: async (userId) => {
    try {
      const query = `SELECT * FROM feedback_history WHERE user_id = ? ORDER BY created_at DESC`;
      const [results] = await pool.execute(query, [userId]);
      return results;
    } catch (error) {
      throw new Error(`Error fetching feedback history: ${error.message}`);
    }
  },
};

module.exports = Feedback;
