// src/screens/RegisterScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();
  const [tipoConta, setTipoConta] = useState('aluno');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Criar Conta</Text>
        <Text style={styles.subtitle}>Junte-se ao SpaceLearn</Text>

        <View style={styles.card}>
          <View style={styles.tipoContaContainer}>
            <TouchableOpacity
              style={[styles.tipoButton, tipoConta === 'aluno' && styles.tipoSelecionado]}
              onPress={() => setTipoConta('aluno')}
            >
              <Text style={[styles.tipoTexto, tipoConta === 'aluno' && styles.tipoTextoSelecionado]}>Aluno</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tipoButton, tipoConta === 'professor' && styles.tipoSelecionado]}
              onPress={() => setTipoConta('professor')}
            >
              <Text style={[styles.tipoTexto, tipoConta === 'professor' && styles.tipoTextoSelecionado]}>Professor</Text>
            </TouchableOpacity>
          </View>

          <TextInput placeholder="Nome completo" style={styles.input} placeholderTextColor="#999" />
          <TextInput placeholder="E-mail" style={styles.input} placeholderTextColor="#999" keyboardType="email-address" />
          <TextInput placeholder="Matrícula" style={styles.input} placeholderTextColor="#999" />
          <TextInput placeholder="Senha" style={styles.input} placeholderTextColor="#999" secureTextEntry />
          <TextInput placeholder="Confirmar senha" style={styles.input} placeholderTextColor="#999" secureTextEntry />

          <TouchableOpacity style={styles.registerButton} onPress={() => router.push('/login')}>
            <Text style={styles.registerButtonText}>Registrar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.loginLink}>Já tem uma conta?</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1856', // Midnight Blue
  },
  scroll: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#F2F2F7', // Ghost White
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#F2F2F7', // Ghost White
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#F2F2F7', // Ghost White
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  tipoContaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tipoButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
  },
  tipoSelecionado: {
    backgroundColor: '#E80074', // Red Purple
  },
  tipoTexto: {
    fontSize: 16,
    color: '#0C0931', // Oxford Blue
  },
  tipoTextoSelecionado: {
    color: '#F2F2F7', // Ghost White
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 16,
    color: '#0C0931', // Oxford Blue
  },
  registerButton: {
    backgroundColor: '#00CFE5', // Sky Blue Crayola
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: '#0C0931', // Oxford Blue
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    color: '#F2F2F7', // Ghost White
    fontSize: 14,
    marginTop: 10,
  },
});