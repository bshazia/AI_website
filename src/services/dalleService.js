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

// Function to generate DALL-E image
export const generateDalleImage = async (prompt) => {
  try {
    // Fetch CSRF token
    const csrfToken = await fetchCsrfToken();
    console.log("csrfToken", csrfToken);

    // Generate DALL-E image
    const response = await axios.post(
      `${API_URL}/api/generate-image`,
      { prompt },
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken, // Include CSRF token in the headers
        },
        withCredentials: true, // Ensure cookies are sent with the request
      }
    );

    const { image, optimizedDescription } = response.data;
    // Assuming `image` is a URL or base64 encoded string
    return response.data; // Return the URL or base64 encoded string of the image
  } catch (error) {
    console.error("Error in generateDalleImage:", error);
    throw new Error("Error generating image, please try again.");
  }
};
