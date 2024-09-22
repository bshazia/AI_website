const path = require("path");
const { exec } = require("child_process");
const fs = require("fs");
const { spawn } = require("child_process");

// Helper function to generate GIF from Image and Text
const generateGifFromImageAndText = (imagePath, textPrompt) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn("python3", [
      "generate_gif.py",
      "--text",
      textPrompt,
    ]);

    pythonProcess.stdin.write(imagePath); // Correctly pass image path
    pythonProcess.stdin.end();

    let output = "";

    // Capture Python script output
    pythonProcess.stdout.on("data", (chunk) => {
      output += chunk;
    });

    pythonProcess.stderr.on("data", (error) => {
      return reject(`Error generating GIF: ${error.toString()}`);
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        return reject(`Python process exited with code ${code}`);
      }
      console.log(`GIF generated successfully`);
      resolve(output); // Output should contain the success message or result
    });
  });
};

// Route handler for GIF generation
exports.generateGif = async (req, res) => {
  if (!req.file || !req.body.textPrompt) {
    return res.status(400).send("Image and text prompt are required.");
  }

  const imagePath = req.file.path; // Use the path to the uploaded image
  const textPrompt = req.body.textPrompt; // Text prompt

  try {
    const result = await generateGifFromImageAndText(imagePath, textPrompt);
    res.send(result); // Send the generated result as response
  } catch (error) {
    console.error(`Error: ${error}`);
    res.status(500).send(`Error: ${error}`);
  }
};
