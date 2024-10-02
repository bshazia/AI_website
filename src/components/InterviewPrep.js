// src/components/InterviewPrep.js
import React, { useState, useEffect } from "react";
import {
  fetchQuestions,
  getFeedback,
  fetchFeedbackHistory,
} from "../services/interviewService";

const InterviewPrep = ({ userId }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponse, setUserResponse] = useState("");
  const [feedback, setFeedback] = useState("");
  const [history, setHistory] = useState([]);
  const [recognizing, setRecognizing] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      const questionsData = await fetchQuestions();
      setQuestions(questionsData);
    };
    loadQuestions();
  }, []);

  const handleStartRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.start();
    setRecognizing(true);

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setUserResponse(speechResult);
      setRecognizing(false);
    };

    recognition.onerror = () => setRecognizing(false);
  };

 const handleGetFeedback = async () => {
   const question = questions[currentQuestionIndex];
   try {
     const feedbackData = await getFeedback(userId, userResponse, question);
     setFeedback(feedbackData);
     setCurrentQuestionIndex((prev) => prev + 1);
   } catch (error) {
     if (error.response && error.response.status === 400) {
       console.error("Invalid token. Please log in again.");
       setFeedback("Invalid token. Please log in again.");
     } else {
       console.error("Error getting feedback:", error);
       setFeedback("An error occurred. Please try again.");
     }
   }
 };


  const loadHistory = async () => {
    const historyData = await fetchFeedbackHistory( userId);
    setHistory(historyData);
  };

  return (
    <div>
      <h3>AI-Based Job Interview Prep</h3>

      {currentQuestionIndex < questions.length && (
        <div>
          <h4>
            Question {currentQuestionIndex + 1}:{" "}
            {questions[currentQuestionIndex]}
          </h4>
          <button onClick={handleStartRecognition} disabled={recognizing}>
            {recognizing ? "Listening..." : "Answer with your voice"}
          </button>

          <textarea
            value={userResponse}
            onChange={(e) => setUserResponse(e.target.value)}
            placeholder="Or type your response here"
          />

          <button onClick={handleGetFeedback} disabled={!userResponse}>
            Get Feedback
          </button>

          {feedback && (
            <div>
              <h4>Feedback:</h4>
              <p>{feedback}</p>
            </div>
          )}
        </div>
      )}

      {currentQuestionIndex >= questions.length && (
        <div>
          <h4>You've completed all questions!</h4>
          <button onClick={loadHistory}>View Feedback History</button>
        </div>
      )}

      {history.length > 0 && (
        <div>
          <h4>Your Feedback History:</h4>
          <ul>
            {history.map((entry, index) => (
              <li key={index}>
                <strong>Question:</strong> {entry.question}
                <br />
                <strong>Your Response:</strong> {entry.response}
                <br />
                <strong>Feedback:</strong> {entry.feedback}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InterviewPrep;