import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { useTheme } from '../../context/ThemeContext'; // Importe o hook useTheme

// Defina estilos base que não mudam com o tema
const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  medalIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  medalIconText: {
    fontSize: 60,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  backButtonText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default function MedalDetailScreen() {
  const { titulo, descricao, conquistada } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme(); // Use o hook para acessar o tema

  return (
    <View style={[baseStyles.container, { backgroundColor: theme.colors.backgroundPrimary }]}>
      <Text style={[baseStyles.title, { color: theme.colors.accentPrimary }]}>{titulo}</Text>
      <View
        style={[
          baseStyles.medalIcon,
          { backgroundColor: conquistada === '1' ? theme.colors.accentPrimary : theme.colors.backgroundSecondary },
        ]}
      >
        <Text 
          style={[
            baseStyles.medalIconText, 
            // Texto do ícone: OXFORD BLUE se conquistada (para contraste com fundo SKY BLUE), GHOST WHITE se não conquistada
            { color: conquistada === '1' ? theme.colors.buttonPrimaryText : theme.colors.textPrimary } 
          ]}
        >
          {conquistada === '1' ? '🏅' : '🔒'}
        </Text>
      </View>
      <Text style={[baseStyles.description, { color: theme.colors.textPrimary }]}>{descricao}</Text>

      <TouchableOpacity style={[baseStyles.backButton, { backgroundColor: theme.colors.accentSecondary }]} onPress={() => router.back()}>
        <Text style={[baseStyles.backButtonText, { color: theme.colors.buttonSecondaryText }]}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}