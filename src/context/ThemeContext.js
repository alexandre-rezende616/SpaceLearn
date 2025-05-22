import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Defina suas paletas de cores para os dois temas
const lightThemeColors = {
  backgroundPrimary: '#F2F2F7',    // GHOST WHITE - Fundo principal de telas
  backgroundSecondary: '#FFFFFF',  // Branco puro - Fundo de cards, modais, inputs
  textPrimary: '#0C0931',          // OXFORD BLUE - Texto principal, títulos em cards claros
  textSecondary: '#555555',        // Cinza escuro - Subtextos, placeholders
  accentPrimary: '#00CFE5',        // SKY BLUE CRAYOLA - Destaques, ícones ativos, botões primários
  accentSecondary: '#E80074',      // RED PURPLE - Ações de perigo, botões secundários
  borderPrimary: '#0C0931',        // OXFORD BLUE - Bordas em inputs, divisores
  borderSecondary: '#DDDDDD',      // Cinza claro - Bordas sutis
  buttonPrimaryBackground: '#00CFE5',
  buttonPrimaryText: '#0C0931',
  buttonSecondaryBackground: '#E80074',
  buttonSecondaryText: '#F2F2F7',
};

const darkThemeColors = {
  backgroundPrimary: '#1D1856',    // MIDNIGHT BLUE - Fundo principal de telas
  backgroundSecondary: '#0C0931',  // OXFORD BLUE - Fundo de cards, modais, inputs
  textPrimary: '#F2F2F7',          // GHOST WHITE - Texto principal, títulos em cards escuros
  textSecondary: '#A9A9A9',        // Cinza claro - Subtextos, placeholders
  accentPrimary: '#00CFE5',        // SKY BLUE CRAYOLA - Destaques, ícones ativos, botões primários
  accentSecondary: '#E80074',      // RED PURPLE - Ações de perigo, botões secundários
  borderPrimary: '#00CFE5',        // SKY BLUE CRAYOLA - Bordas em inputs, divisores
  borderSecondary: '#3A3F6E',      // Um azul/cinza escuro para bordas sutis no tema escuro
  buttonPrimaryBackground: '#00CFE5',
  buttonPrimaryText: '#0C0931',
  buttonSecondaryBackground: '#E80074',
  buttonSecondaryText: '#F2F2F7',
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true); // Começa com tema escuro por padrão
  
  const currentTheme = isDarkTheme 
    ? { colors: darkThemeColors, isDark: true }
    : { colors: lightThemeColors, isDark: false };

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

  const toggleTheme = async () => {
    const newThemeIsDark = !isDarkTheme;
    setIsDarkTheme(newThemeIsDark);
    try {
      await AsyncStorage.setItem('themePreference', newThemeIsDark ? 'dark' : 'light');
    } catch (error) {
      console.error('Erro ao salvar preferência de tema:', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);