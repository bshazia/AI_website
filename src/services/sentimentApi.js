// src/services/sentimentApi.js

import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

/**
 * Sends a request to analyze sentiment
 * @param {string} text - The text to analyze
 * @returns {object} - Response from sentiment analysis API
 */
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

export const analyzeSentiment = async (text) => {
               const csrfToken = await fetchCsrfToken(); // Fetch CSRF token

               try {
                 const response = await axios.post(
                   `${API_URL}/api/sentiment`,
                   {
                     text,
                   },
                   {
                     headers: {
                       "X-CSRF-Token": csrfToken, // Include CSRF token in the request header
                     },
                   }
                 );
                 return response.data;
               } catch (error) {
                 console.error("Error analyzing sentiment:", error);
                 throw error;
               }
             };;
