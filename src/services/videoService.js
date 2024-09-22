import axios from "axios";

export const generateVideoService = async (image, textPrompt, csrfToken) => {
  const formData = new FormData();
  formData.append("image", image); // Attach the image directly
  formData.append("textPrompt", textPrompt); // Attach the prompt

  const response = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/sumarize`,
    formData,
    {
      headers: {
        "X-CSRF-Token": csrfToken, // Pass CSRF token in the header
        "Content-Type": "multipart/form-data", // Ensure multipart/form-data is used
      },
      withCredentials: true,
      responseType: "blob", // Expect a video blob in response
    }
  );

  return response.data;
};
