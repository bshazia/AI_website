import React, { createContext, useContext, useState } from "react";

const TranscriptionContext = createContext();

export const useTranscriptionContext = () => useContext(TranscriptionContext);

export const TranscriptionProvider = ({ children }) => {
  const [transcriptionData, setTranscriptionData] = useState("");

  return (
    <TranscriptionContext.Provider
      value={{ transcriptionData, setTranscriptionData }}
    >
      {children}
    </TranscriptionContext.Provider>
  );
};
