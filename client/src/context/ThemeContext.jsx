import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DARK_THEME, LIGHT_THEME } from "../constants/themeConstants";
export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  // Récupérer le thème initial du localStorage ou utiliser un thème par défaut
  const [theme, setTheme] = useState(() => {
    return window.localStorage.getItem("themeMode") || LIGHT_THEME; // Utilise LIGHT_THEME par défaut
  });

  useEffect(() => {
    window.localStorage.setItem("themeMode", theme);
  }, [theme]); // Mettre à jour le localStorage lorsque le thème change

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
