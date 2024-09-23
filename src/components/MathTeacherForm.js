import React, { useState } from "react";
import { askMathTeacher } from "../services/mathassistantService";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles//MathTeacherForm.css"; // Import CSS for styling

const MathTeacherForm = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Call the backend service to fetch the response from the math assistant
      const answer = await askMathTeacher(question);
      setResponse(answer);
    } catch (error) {
      setResponse("Error occurred while fetching response.");
    } finally {
      setLoading(false);
    }
  };

  // Function to format the response into a more readable structure
  const formatResponse = (text) => {
    const lines = text.split("\n");
    return lines.map((line, index) => <p key={index}>{line}</p>);
  };

  return (
    <div className="assistant-page">
      <button onClick={() => navigate("/dashboard")} className="back-button">
        Back to Dashboard
      </button>

      <h1>Ask the Math Teacher</h1>
      <form onSubmit={handleSubmit} className="math-form">
        <label>
          Enter your math question:
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What is the derivative of x^2?"
            required
            className="question-input"
          />
        </label>

        <button type="submit" disabled={loading} className="submit-button">
          {loading ? "Loading..." : "Ask"}
        </button>
      </form>
      {response && (
        <div className="response">
          <h2>Teacher's Response:</h2>
          <div className="formatted-response">{formatResponse(response)}</div>
        </div>
      )}
    </div>
  );
};

export default MathTeacherForm;
