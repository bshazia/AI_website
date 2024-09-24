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
export const generateAudiobook = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const csrfToken = await fetchCsrfToken(); // Assume this is implemented

  const response = await axios.post(
    `${API_URL}/api/generate-audiobook`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-CSRF-Token": csrfToken,
      },
      withCredentials: true,
    }
  );

  return response.data.audio;
};
