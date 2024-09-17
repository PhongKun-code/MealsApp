// context/ThemeContext.js
import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const addFavorite = (meal) => {
    setFavorites((prevFavorites) => [...prevFavorites, meal]);
  };

  const removeFavorite = (mealId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((meal) => meal.id !== mealId)
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        favorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
