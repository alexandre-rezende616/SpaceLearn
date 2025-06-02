// app/_layout.js
import { Stack } from 'expo-router';
import { AuthProvider } from '../src/context/AuthContext';
import { ThemeProvider } from '../src/context/ThemeContext';

export default function RootLayout() {
  // console.log('--- [RootLayout] RootLayout EXECUTANDO ---');
  return (
    <ThemeProvider>
      {/* Nenhum comentário // ou texto solto deve estar aqui */}
      <AuthProvider>
        {/* Nenhum comentário // ou texto solto deve estar aqui */}
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(professor)" />
        </Stack>
        {/* Nenhum comentário // ou texto solto deve estar aqui */}
      </AuthProvider>
      {/* Nenhum comentário // ou texto solto deve estar aqui */}
    </ThemeProvider>
  );
}
