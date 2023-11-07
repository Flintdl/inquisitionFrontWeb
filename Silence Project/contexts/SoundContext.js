import React, { createContext, useContext, useState } from "react";

const SoundAllowedContext = createContext();

export const SoundAllowed = ({ children }) => {
  const [soundAllowed, setSoundAllowed] = useState("not-allowed");

  return (
    <SoundAllowedContext.Provider value={{ soundAllowed, setSoundAllowed }}>
      {children}
    </SoundAllowedContext.Provider>
  );
};

export const useSoundAllowed = () => {
  const context = useContext(SoundAllowedContext);
  if (!context) {
    throw new Error("useSoundAllowed must be used within a SoundAllowed");
  }
  return context;
};
