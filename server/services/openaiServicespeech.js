const OpenAI = require("openai");

const openai = new OpenAI();

exports.createSpeech = async (text, model, voice) => {
  const mp3 = await openai.audio.speech.create({
    model: model,
    voice: voice,
    input: text,
  });

  const buffer = Buffer.from(await mp3.arrayBuffer());
  // No need to write to a file; just return the buffer
  return buffer;
};
