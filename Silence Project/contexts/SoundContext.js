import { parseCookies, setCookie } from 'nookies';
import React, { createContext, useContext, useEffect, useState } from 'react';

const SoundAllowedContext = createContext();

export const SoundAllowed = ({ children }) => {
  const { sound_allowed } = parseCookies();
  const [soundAllowed, setSoundAllowed] = useState('not-allowed');

  useEffect(() => {
    // Verifica se o status está salvo no localStorage

    if (sound_allowed) {
      setSoundAllowed(sound_allowed);
    }
  }, [sound_allowed]);

  const handleSetSound = (status) => {
    // Atualiza o estado e salva no localStorage
    setSoundAllowed(status);
    setCookie(null, 'sound_allowed', status, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
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
