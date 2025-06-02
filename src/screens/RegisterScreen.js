// src/screens/RegisterScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { registerUser } from '../services/authService'; // Importar a função de registro

export default function RegisterScreen() {
  const router = useRouter();
  const [tipoConta, setTipoConta] = useState('aluno');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [matricula, setMatricula] = useState(''); // Coletando, mas não usado pelo backend ainda
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
    setIsLoading(true);
    try {
      // O backend espera 'role', não 'tipoConta'. E não usa 'matricula' por enquanto.
      const userData = { nome, email, senha, role: tipoConta };
      const data = await registerUser(userData);
      Alert.alert('Sucesso!', data.message || 'Usuário registrado com sucesso! Faça o login.');
      router.push('/login'); // Navega para a tela de login após o registro
    } catch (error) {
      Alert.alert('Erro no Registro', error.message || 'Não foi possível registrar o usuário.');
    } finally {
      setIsLoading(false);
    }
  };

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

          <TextInput
            placeholder="Nome completo"
            style={styles.input}
            placeholderTextColor="#999"
            value={nome}
            onChangeText={setNome}
          />
          <TextInput
            placeholder="E-mail"
            style={styles.input}
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder="Matrícula (Opcional por enquanto)"
            style={styles.input}
            placeholderTextColor="#999"
            value={matricula}
            onChangeText={setMatricula}
          />
          <TextInput
            placeholder="Senha"
            style={styles.input}
            placeholderTextColor="#999"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
          <TextInput
            placeholder="Confirmar senha"
            style={styles.input}
            placeholderTextColor="#999"
            secureTextEntry
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />
          <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={isLoading}>
            <Text style={styles.registerButtonText}>{isLoading ? 'Registrando...' : 'Registrar'}</Text>
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