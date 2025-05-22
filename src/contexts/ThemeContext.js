import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

// Defina suas paletas de cores para os dois temas
const lightTheme = {
  colors: {
    backgroundPrimary: '#F2F2F7', // GHOST WHITE
    backgroundSecondary: '#FFFFFF', // Branco puro para cards/containers
    textPrimary: '#0C0931', // OXFORD BLUE
    textSecondary: '#555', // Cinza escuro para detalhes
    accentPrimary: '#00CFE5', // SKY BLUE CRAYOLA (pode ser a mesma)
    accentSecondary: '#E80074', // RED PURPLE (pode ser a mesma)
    borderPrimary: '#0C0931', // OXFORD BLUE
    borderSecondary: '#ccc', // Cinza
    // Adicione outras cores conforme necessário (ex: cores de botões específicos)
    buttonPrimaryBackground: '#00CFE5', // SKY BLUE CRAYOLA
    buttonPrimaryText: '#0C0931', // OXFORD BLUE
    buttonSecondaryBackground: '#E80074', // RED PURPLE
    buttonSecondaryText: '#F2F2F7', // GHOST WHITE
    buttonOutlineText: '#0C0931', // OXFORD BLUE
    buttonOutlineBorder: '#0C0931', // OXFORD BLUE
  },
  isDark: false,
};

const darkTheme = {
  colors: {
    backgroundPrimary: '#1D1856', // MIDNIGHT BLUE
    backgroundSecondary: '#0C0931', // OXFORD BLUE
    textPrimary: '#F2F2F7', // GHOST WHITE
    textSecondary: '#A9A9A9', // Cinza claro
    accentPrimary: '#00CFE5', // SKY BLUE CRAYOLA
    accentSecondary: '#E80074', // RED PURPLE
    borderPrimary: '#00CFE5', // SKY BLUE CRAYOLA
    borderSecondary: '#e0e0e0', // Cinza claro
    // Adicione outras cores conforme necessário
    buttonPrimaryBackground: '#00CFE5', // SKY BLUE CRAYOLA
    buttonPrimaryText: '#0C0931', // OXFORD BLUE
    buttonSecondaryBackground: '#E80074', // RED PURPLE
    buttonSecondaryText: '#F2F2F7', // GHOST WHITE
    buttonOutlineText: '#00CFE5', // SKY BLUE CRAYOLA
    buttonOutlineBorder: '#00CFE5', // SKY BLUE CRAYOLA
  },
  isDark: true,
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Começa com tema claro por padrão
  const theme = isDarkTheme ? darkTheme : lightTheme;

  // Carregar preferência do tema ao iniciar o app
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('themePreference');
        if (savedTheme !== null) {
          setIsDarkTheme(savedTheme === 'dark');
        }
      } catch (error) {
        console.error('Erro ao carregar preferência de tema:', error);
      }
    };
    loadThemePreference();
  }, []);

  // Salvar preferência do tema ao mudar
  const toggleTheme = async () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    try {
      await AsyncStorage.setItem('themePreference', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Erro ao salvar preferência de tema:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);