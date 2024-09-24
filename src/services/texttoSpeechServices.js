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


// Function to generate speech
export const generateSpeech = async (text, model, voice) => {
               const csrfToken = await fetchCsrfToken(); // Fetch CSRF token

               const response = await axios.post(`${API_URL}/api/generate-speech`,
                 {
                   text,
                   model,
                   voice,
                 },
                 {
                   headers: {
                     "X-CSRF-Token": csrfToken, // Include CSRF token here
                   },
                   withCredentials: true, // Ensure credentials are sent
                 }
               );
               return response.data.audio;
             };;
