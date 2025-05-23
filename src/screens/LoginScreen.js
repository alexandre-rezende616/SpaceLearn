// src/screens/LoginScreen.js
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState('aluno'); // 'aluno' ou 'professor'

  const handleLogin = () => {
    if (tipoUsuario === 'aluno') {
      router.push('/(tabs)/home'); // Redireciona para o painel do aluno
    } else if (tipoUsuario === 'professor') {
      router.push('/(professor)/painel'); // Redireciona para o painel do professor
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/login-image.png')} style={styles.image} />

      <Text style={styles.title}>Log in</Text>

      <TextInput
        style={styles.input}
        placeholder="email@gmail.com"
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="senha"
          placeholderTextColor="#888"
          secureTextEntry={!mostrarSenha}
          value={senha}
          onChangeText={setSenha}
        />
        <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
          <Ionicons
            name={mostrarSenha ? 'eye-off' : 'rocket-outline'}
            size={20}
            color="#0C0931"
          />
        </TouchableOpacity>
      </View>

      {/* Seleção do tipo de usuário */}
      <View style={styles.tipoUsuarioContainer}>
        <TouchableOpacity
          style={[
            styles.tipoUsuarioButton,
            tipoUsuario === 'aluno' && styles.tipoUsuarioSelecionado,
          ]}
          onPress={() => setTipoUsuario('aluno')}
        >
          <Text
            style={[
              styles.tipoUsuarioTexto,
              tipoUsuario === 'aluno' && styles.tipoUsuarioTextoSelecionado,
            ]}
          >
            Aluno
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tipoUsuarioButton,
            tipoUsuario === 'professor' && styles.tipoUsuarioSelecionado,
          ]}
          onPress={() => setTipoUsuario('professor')}
        >
          <Text
            style={[
              styles.tipoUsuarioTexto,
              tipoUsuario === 'professor' && styles.tipoUsuarioTextoSelecionado,
            ]}
          >
            Professor
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <Text style={styles.separatorText}>ou</Text>
        <View style={styles.separator} />
      </View>

      <View style={styles.socialButtonsContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialText}>Microsoft</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={styles.registerText}>Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1856', // Midnight Blue
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    borderRadius: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    color: '#F2F2F7', // Ghost White
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  input: {
    backgroundColor: '#F2F2F7', // Ghost White
    width: '100%',
    height: 45,
    borderRadius: 30,
    paddingHorizontal: 20,
    marginBottom: 10,
    color: '#0C0931', // Oxford Blue
  },
  passwordContainer: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7', // Ghost White
    width: '100%',
    height: 45,
    borderRadius: 30,
    paddingHorizontal: 20,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  passwordInput: {
    flex: 1,
    color: '#0C0931',
  },
  tipoUsuarioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    width: '100%',
  },
  tipoUsuarioButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
  },
  tipoUsuarioSelecionado: {
    backgroundColor: '#E80074', // Red Purple
  },
  tipoUsuarioTexto: {
    fontSize: 16,
    color: '#0C0931', // Oxford Blue
  },
  tipoUsuarioTextoSelecionado: {
    color: '#F2F2F7', // Ghost White
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#00CFE5', // Sky Blue Crayola
    width: '100%',
    height: 45,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#0C0931',
    fontWeight: 'bold',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#F2F2F7',
  },
  separatorText: {
    marginHorizontal: 10,
    color: '#F2F2F7',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  socialButton: {
    backgroundColor: '#F2F2F7',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  socialText: {
    fontWeight: 'bold',
    color: '#0C0931',
  },
  registerText: {
    color: '#E80074', // Red Purple
    fontWeight: 'bold',
  },
});