import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const SocketContext = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    console.log(socket);
  }, [socket]);

  return (
    <UserContext.Provider value={{ socket, setSocket }}>
      {children}
    </UserContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketContext");
  }
  return context;
};
