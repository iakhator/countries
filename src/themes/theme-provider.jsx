import React, {useState, useEffect, createContext } from 'react';
import {themes} from './theme'

export const ThemeContext = createContext(themes.light);

export const ThemeProvider =  ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, themes, toggleTheme }}>
      <div style={themes[theme]}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
