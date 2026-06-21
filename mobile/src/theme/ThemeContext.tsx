import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { lightColors, darkColors, ThemeColors } from './colors';

type ThemeType = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: 'light' | 'dark';
  colors: ThemeColors;
  setTheme: (theme: ThemeType) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  colors: lightColors,
  setTheme: () => {},
  isDark: false,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeType>('system');

  const resolvedScheme = systemColorScheme === 'dark' ? 'dark' : 'light';
  const activeTheme = themeMode === 'system' ? resolvedScheme : themeMode;
  const isDark = activeTheme === 'dark';
  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme: activeTheme, colors, setTheme: setThemeMode, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
