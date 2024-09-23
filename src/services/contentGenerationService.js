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
export const generateContent = async (prompt) => {
               const csrfToken = await fetchCsrfToken(); // Fetch CSRF token

               const response = await axios.post(
                 `${API_URL}/api/generate-content`,
                 { prompt },
                 {
                   headers: {
                     "X-CSRF-Token": csrfToken, // Include CSRF token in the request header
                   },
                 }
               );
               return response.data;
             };;
