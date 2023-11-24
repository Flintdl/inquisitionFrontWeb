import React, { createContext, useContext, useEffect, useState } from 'react';

const SoundAllowedContext = createContext();

export const SoundAllowed = ({ children }) => {
  const [soundAllowed, setSoundAllowed] = useState('not-allowed');

  useEffect(() => {
    // Verifica se o status está salvo no localStorage
    const localStorageStatus = localStorage.getItem('soundAllowed');

    if (localStorageStatus) {
      setSoundAllowed(localStorageStatus);
    }
  }, []);

  const handleSetSound = (status) => {
    // Atualiza o estado e salva no localStorage
    setSoundAllowed(status);
    localStorage.setItem('soundAllowed', status);
  };

  return (
    <SoundAllowedContext.Provider
      value={{ soundAllowed, setSoundAllowed: handleSetSound }}>
      {children}
    </SoundAllowedContext.Provider>
  );
};

export const useSoundAllowed = () => {
  const context = useContext(SoundAllowedContext);
  if (!context) {
    throw new Error('useSoundAllowed must be used within a SoundAllowed');
  }
  return context;
};
