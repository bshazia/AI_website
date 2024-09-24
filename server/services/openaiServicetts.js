const OpenAI = require("openai");

const openai = new OpenAI();

// Function to create speech from text
exports.createSpeech = async (text) => {
    const model = "tts-1-hd"; // Hardcoded model
    const voice = "alloy"; // Hardcoded voice

   
        const mp3 = await openai.audio.speech.create({
            model: model,
            voice: voice,
            input: text,
        });
        const buffer = Buffer.from(await mp3.arrayBuffer());
        // No need to write to a file; just return the buffer
         return buffer;
       
    }


