import React from "react";
import "../styles/ToolsSection.css"; // Add new CSS for styling

const tools = [
  { name: "AI Chatbot", description: "A smart chatbot powered by GPT" },
  {
    name: "Free Text-to-Image AI Generator",
    description:
      "Create stunning AI-generated images and visuals from your ideas.",
  },
  {
    name: "AI Video Summarizer",
    description: "Summarize videos Transcript using AI",
  },
  { name: "Text-to-Image", description: "Create images from text prompts" },
  { name: "AI Avatar Creator", description: "Generate avatars with AI" },

  {
    name: "Free AI-Powered Text Editor",
    description: "Supercharge your writing with AI-driven suggestions, grammar correction, and smart content generation",
  },
  // Add more tools as you create new features
];

const ToolsSection = () => {
  return (
    <section className="tools-section">
      <h2>💡 Our AI-Powered Tools</h2>
      <h4>
        Experience the future of communication with our AI Tools, powered by the
        cutting-edge Chat GPT-4.0 version!
      </h4>
      <div className="tools-grid">
        {tools.map((tool, index) => (
          <div key={index} className="tool-card">
            <h3>{tool.name}</h3>
            <p>{tool.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ToolsSection;
