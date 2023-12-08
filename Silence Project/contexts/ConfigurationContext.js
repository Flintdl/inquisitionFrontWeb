import { parseCookies, setCookie } from 'nookies';
import React, { createContext, useContext, useEffect, useState } from 'react';

const ConfigurationContext = createContext();

export const Configuration = ({ children }) => {
  const { graphics_configuration } = parseCookies();
  const [configuration, setConfiguration] = useState({
    graphics: 2, // 0 = Low, 1 = Medium, 2 = High
    exhibition: 0, // 0 = Fullscreen, 1 = Window
  });

  useEffect(() => {
    if (graphics_configuration) {
      const parsedConfiguration = JSON.parse(graphics_configuration);
      setConfiguration(parsedConfiguration);
      // if (parsedConfiguration.exhibition === 1) {
      //   if (document.documentElement.requestFullscreen) {
      //     document.documentElement.requestFullscreen();
      //   } else if (document.documentElement.mozRequestFullScreen) {
      //     document.documentElement.mozRequestFullScreen();
      //   } else if (document.documentElement.webkitRequestFullscreen) {
      //     document.documentElement.webkitRequestFullscreen();
      //   } else if (document.documentElement.msRequestFullscreen) {
      //     document.documentElement.msRequestFullscreen();
      //   }
      // }
    }
  }, [graphics_configuration]);

  const handleSetConfiguration = (key, value) => {
    const newState = { ...configuration, [key]: value };
    try {
      // Atualiza o estado e salva no localStorage
      setConfiguration(newState);
      setCookie(null, 'graphics_configuration', JSON.stringify(newState), {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });

      // if (key === 'exhibition' && value === 1) {
      //   // Coloque o modo de exibição em fullscreen quando exhibition for igual a 0
      //   if (document.documentElement.requestFullscreen) {
      //     document.documentElement.requestFullscreen();
      //   } else if (document.documentElement.mozRequestFullScreen) {
      //     document.documentElement.mozRequestFullScreen();
      //   } else if (document.documentElement.webkitRequestFullscreen) {
      //     document.documentElement.webkitRequestFullscreen();
      //   } else if (document.documentElement.msRequestFullscreen) {
      //     document.documentElement.msRequestFullscreen();
      //   }
      // }
    } catch (error) {
      console.error('Error saving configuration:', error);
    }
  };

  return (
    <ConfigurationContext.Provider
      value={{ configuration, setConfiguration: handleSetConfiguration }}>
      {children}
    </ConfigurationContext.Provider>
  );
};

export const useConfiguration = () => {
  const context = useContext(ConfigurationContext);
  if (!context) {
    throw new Error(
      'useConfiguration must be used within a ConfigurationProvider',
    );
  }
  return context;
};
