import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';

export default function ConfiguracoesScreen() {
  const navigation = useNavigation();

  const [notificacoes, setNotificacoes] = useState(true);
  const [temaEscuro, setTemaEscuro] = useState(false);

  const toggleNotificacoes = () => setNotificacoes(prev => !prev);
  const toggleTemaEscuro = () => {
    setTemaEscuro(prev => !prev);
    Alert.alert('Tema', 'Alternar tema ainda não está implementado.');
  };

  const abrirPolitica = () => {
    Alert.alert('Política de Privacidade', 'Em breve.');
  };

  const abrirTermos = () => {
    Alert.alert('Termos de Uso', 'Em breve.');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Configurações</Text>

      <Text style={styles.sectionTitle}>Preferências</Text>

      <View style={styles.option}>
        <View style={styles.optionLeft}>
          <Ionicons name="notifications-outline" size={22} color="#0C0931" style={styles.icon} />
          <Text style={styles.optionText}>Notificações</Text>
        </View>
        <Switch value={notificacoes} onValueChange={toggleNotificacoes} />
      </View>

      <View style={styles.option}>
        <View style={styles.optionLeft}>
          <Ionicons name="moon-outline" size={22} color="#0C0931" style={styles.icon} />
          <Text style={styles.optionText}>Tema escuro</Text>
        </View>
        <Switch value={temaEscuro} onValueChange={toggleTemaEscuro} />
      </View>

      <Text style={styles.sectionTitle}>Sobre o aplicativo</Text>

      <TouchableOpacity style={styles.option} onPress={abrirPolitica}>
        <View style={styles.optionLeft}>
          <Ionicons name="document-text-outline" size={22} color="#0C0931" style={styles.icon} />
          <Text style={styles.optionText}>Política de Privacidade</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#0C0931" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={abrirTermos}>
        <View style={styles.optionLeft}>
          <Ionicons name="clipboard-outline" size={22} color="#0C0931" style={styles.icon} />
          <Text style={styles.optionText}>Termos de Uso</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#0C0931" />
      </TouchableOpacity>

      <View style={styles.info}>
        <Text style={styles.infoText}>Versão do app: 1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1856', // Midnight Blue
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    color: '#F2F2F7', // Ghost White
    fontWeight: 'bold',
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#F2F2F7', // Ghost White
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 20,
  },
  option: {
    backgroundColor: '#F2F2F7', // Ghost White
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#0C0931', // Oxford Blue
    marginLeft: 12,
  },
  icon: {
    marginRight: 4,
  },
  info: {
    marginTop: 40,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#ccc',
  },
});