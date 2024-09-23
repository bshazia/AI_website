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



export const askMathTeacher = async (question) => {
               const csrfToken = await fetchCsrfToken(); // Fetch CSRF token

               try {
                 const response = await axios.post(
                   `${API_URL}/api/ask-math-teacher`,
                   { question },
                   {
                     headers: {
                       "X-CSRF-Token": csrfToken, // Include CSRF token here
                     },
                     withCredentials: true, // Ensure credentials are sent
                   }
                 );
                 return response.data.answer;
               } catch (error) {
                 console.error("Error asking the math teacher:", error);
                 throw error;
               }
             };;
