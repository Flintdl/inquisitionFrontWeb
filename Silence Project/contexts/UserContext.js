import { parseCookies, setCookie } from 'nookies';
import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const User = ({ children }) => {
  const { user_info } = parseCookies();
  const [user, setUser] = useState({
    id: '0dd013b5-ab61-47f3-acb1-d191a562520e',
    username: 'dlduarte',
    email: 'dld.jb2018@gmail.com',
    active: false,
    player: {
      id: '7d966606-32aa-460c-9a24-571e4e0bfbfa',
      name: '5disaster',
    },
    account: {
      id: '5cf0000f-bee0-4ac2-bab4-4f750b5b45da',
      avatar: 'http://localhost:3000/images/miniature-1-1-mage-profile.png',
      coins: 1000000000,
      diamonds: 3400,
      level: 13,
    },
  });

  useEffect(() => {
    if (user_info) {
      const parsedUser = JSON.parse(user_info);
      setUser(parsedUser);
    }
  }, [user_info]);

  const handleSetUser = (key, value) => {
    const newState = { ...user, [key]: value };
    try {
      // Atualiza o estado e salva no localStorage
      setUser(newState);
      setCookie(null, 'user_info', JSON.stringify(newState), {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
      });
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser: handleSetUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
