import React, { createContext, useContext, useEffect, useState } from 'react';

const ConfigurationContext = createContext();

export const Configuration = ({ children }) => {
  const [configuration, setConfiguration] = useState({
    graphics: 2, // 0 = Low, 1 = Medium, 2 = Hight
    exhibition: 0, // 0 = Fullscreen, 1 = Window
  });

  useEffect(() => {}, [configuration]);

  return (
    <ConfigurationContext.Provider value={{ configuration, setConfiguration }}>
      {children}
    </ConfigurationContext.Provider>
  );
};

export const useConfiguration = () => {
  const context = useContext(ConfigurationContext);
  if (!context) {
    throw new Error('useConfiguration must be used within a SoundAllowed');
  }
  return context;
};
