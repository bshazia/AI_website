// src/services/interviewService.js
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export const fetchCsrfToken = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/get-csrf-token`, {
      withCredentials: true,
    });
    return response.data.csrfToken;
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    throw new Error("Failed to fetch CSRF token");
  }
};
export const fetchQuestions = async (csrfToken) => {
  try {
    const response = await axios.get(`${API_URL}/api/questions`, {
      headers: { "x-csrf-token": csrfToken },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
};

export const getFeedback = async (userId, response, question) => {
         try {
           const csrfToken = await fetchCsrfToken();
           const authToken = localStorage.getItem("token");

           if (!authToken) {
             throw new Error("User not authenticated. Please log in again.");
           }

           // Log to ensure correct parameters are being passed
           console.log("Sending response:", response);
           console.log("Sending question:", question);
           console.log("User ID:", userId);

           const feedbackResponse = await axios.post(
             `${API_URL}/api/feedback`,
             { userId, response, question },
             {
               headers: {
                 "x-csrf-token": csrfToken,
                 Authorization: `Bearer ${authToken}`,
               },
             }
           );

           return feedbackResponse.data.feedback;
         } catch (error) {
           if (error.response && error.response.status === 401) {
             console.error("Authentication error: Invalid or expired token.");
           } else {
             console.error("Error getting feedback:", error);
           }
           return "Error fetching feedback";
         }
       };

export const fetchFeedbackHistory = async ( userId) => {
    try {
          const csrfToken = await fetchCsrfToken(); 

          const response = await axios.get(
            `${API_URL}/api/feedback-history/${userId}`,
            {
              headers: { "x-csrf-token": csrfToken },
            }
          );
          return response.data;
        } catch (error) {
    console.error("Error fetching feedback history:", error);
    return [];
  }
};
