// services/dalleService.js
import axios from "axios";

export const generateDalleImage = async (prompt) => {
  try {
    const response = await axios.post("/api/generate-image", { prompt });
    const { image, optimizedDescription } = response.data;
    // Assuming `image` is a URL or base64 encoded string
    return image; // Return the URL or base64 encoded string of the image
  } catch (error) {
    console.error("Error in generateDalleImage:", error);
    throw new Error("Error generating image, please try again.");
  }
};
