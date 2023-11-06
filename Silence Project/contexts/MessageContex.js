import React, { createContext, useContext, useState } from "react";

const MessageContext = createContext();

export const SocketMessage = ({ children }) => {
  const [messages, setMessages] = useState([]);

  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within a SocketMessage");
  }
  return context;
};
