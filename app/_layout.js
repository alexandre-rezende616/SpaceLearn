// app/_layout.js
import { Stack } from 'expo-router';
import { ThemeProvider } from '../src/context/ThemeContext';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerShown: false, // Oculta o header globalmente
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="(tabs)" />
        {/* Removidos os caminhos antigos do professor */}
      </Stack>
    </ThemeProvider>
  );
}
