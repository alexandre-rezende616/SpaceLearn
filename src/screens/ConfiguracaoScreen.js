import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { useTheme } from '../context/ThemeContext'; // 1. Importe o hook useTheme

// Defina estilos base que não mudam com o tema
const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 20,
  },
  option: {
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // Elevação sutil
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 12,
  },
  icon: {
    marginRight: 4, // Ajuste se necessário
  },
  info: {
    marginTop: 40,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
  },
});

export default function ConfiguracoesScreen() {
  const navigation = useNavigation();
  const { theme, toggleTheme } = useTheme(); // 2. Use o hook para acessar o tema e a função de alternar

  const [notificacoes, setNotificacoes] = useState(true);
  // O estado do tema escuro agora vem do contexto
  const temaEscuroAtivado = theme.isDark; 

  const toggleNotificacoes = () => setNotificacoes(prev => !prev);
  const handleToggleTemaEscuro = () => {
    toggleTheme(); // 3. Chama a função do contexto para alternar e salvar o tema
  };

  const abrirPolitica = () => {
    Alert.alert('Política de Privacidade', 'Em breve.');
  };

  const abrirTermos = () => {
    Alert.alert('Termos de Uso', 'Em breve.');
  };

  return (
    <ScrollView style={[baseStyles.container, { backgroundColor: theme.colors.backgroundPrimary }]}> 
      {/* Botão de voltar */}
      <TouchableOpacity style={baseStyles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color={theme.colors.textPrimary} />
      </TouchableOpacity>

      <Text style={[baseStyles.title, { color: theme.colors.accentPrimary }]}>Configurações</Text>

      <Text style={[baseStyles.sectionTitle, { color: theme.colors.textPrimary }]}>Preferências</Text>

      <View style={[
        baseStyles.option,
        {
          backgroundColor: theme.colors.backgroundSecondary,
          shadowColor: theme.isDark ? '#000' : '#A9A9A9',
        }
      ]}>
        <View style={baseStyles.optionLeft}>
          <Ionicons 
            name="notifications-outline" 
            size={22} 
            color={theme.colors.textPrimary} 
            style={baseStyles.icon} 
          />
          <Text style={[baseStyles.optionText, { color: theme.colors.textPrimary }]}>Notificações</Text>
        </View>
        <Switch 
          value={notificacoes} 
          onValueChange={toggleNotificacoes}
          trackColor={{ false: "#767577", true: theme.colors.accentPrimary }}
          thumbColor={notificacoes ? (theme.isDark ? theme.colors.accentPrimary : theme.colors.backgroundPrimary) : "#f4f3f4"}
        />
      </View>
      <View style={[
        baseStyles.option,
        {
          backgroundColor: theme.colors.backgroundSecondary,
          shadowColor: theme.isDark ? '#000' : '#A9A9A9',
        }
      ]}>
        <View style={baseStyles.optionLeft}>
          <Ionicons 
            name="moon-outline" 
            size={22} 
            color={theme.colors.textPrimary} 
            style={baseStyles.icon} 
          />
          <Text style={[baseStyles.optionText, { color: theme.colors.textPrimary }]}>Tema escuro</Text>
        </View>
        <Switch 
          value={temaEscuroAtivado} 
          onValueChange={handleToggleTemaEscuro}
          trackColor={{ false: "#767577", true: theme.colors.accentPrimary }}
          thumbColor={temaEscuroAtivado ? (theme.isDark ? theme.colors.accentPrimary : theme.colors.backgroundPrimary) : "#f4f3f4"}
        />
      </View>

      <Text style={[baseStyles.sectionTitle, { color: theme.colors.textPrimary }]}>Sobre o aplicativo</Text>

      <TouchableOpacity 
        style={[
          baseStyles.option, 
          { 
            backgroundColor: theme.colors.backgroundSecondary,
            shadowColor: theme.isDark ? '#000' : '#A9A9A9',
          }
        ]} 
        onPress={abrirPolitica}
      >
        <View style={baseStyles.optionLeft}>
          <Ionicons 
            name="document-text-outline" 
            size={22} 
            color={theme.colors.textPrimary} 
            style={baseStyles.icon} 
          />
          <Text style={[baseStyles.optionText, { color: theme.colors.textPrimary }]}>Política de Privacidade</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={theme.colors.textPrimary} />
      </TouchableOpacity>

      <TouchableOpacity 
        style={[
          baseStyles.option, 
          { 
            backgroundColor: theme.colors.backgroundSecondary,
            shadowColor: theme.isDark ? '#000' : '#A9A9A9',
          }
        ]} 
        onPress={abrirTermos}
      >
        <View style={baseStyles.optionLeft}>
          <Ionicons 
            name="clipboard-outline" 
            size={22} 
            color={theme.colors.textPrimary} 
            style={baseStyles.icon} 
          />
          <Text style={[baseStyles.optionText, { color: theme.colors.textPrimary }]}>Termos de Uso</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={theme.colors.textPrimary} />
      </TouchableOpacity>
      <View style={baseStyles.info}>
        <Text style={[baseStyles.infoText, { color: theme.colors.textSecondary }]}>Versão do app: 1.0.0</Text>
      </View> 
    </ScrollView>
  );
} 