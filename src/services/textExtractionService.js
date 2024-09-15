// services/textExtractionService.js
import axios from "axios";
import { PDFDocument } from "pdf-lib";
import mammoth from "mammoth";

// Extract text from PDF
export const extractTextFromPDF = async (file) => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = async (event) => {
      try {
        const pdfDoc = await PDFDocument.load(event.target.result);
        const pages = pdfDoc.getPages();
        const text = await Promise.all(
          pages.map(async (page) => page.getTextContent())
        );
        resolve(
          text
            .map((pageText) => pageText.items.map((item) => item.str).join(" "))
            .join("\n")
        );
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsArrayBuffer(file);
  });
};

// Extract text from Word
export const extractTextFromWord = async (file) => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = async (event) => {
      try {
        const result = await mammoth.extractRawText({
          arrayBuffer: event.target.result,
        });
        resolve(result.value);
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsArrayBuffer(file);
  });
};

// Extract text from URL
export const extractTextFromURL = async (url) => {
  const response = await axios.get(url);
  const html = response.data;
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.innerText;
};
