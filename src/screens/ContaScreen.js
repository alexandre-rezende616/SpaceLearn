import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ContaScreen() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert('Sair', 'Tem certeza que deseja sair da conta?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', onPress: () => router.replace('/login') },
    ]);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Botão de Voltar */}
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={38} color="#F2F2F7" />
      </TouchableOpacity>

      {/* Perfil do usuário */}
      <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/images/avatarr.png')}
          style={styles.avatar}
        />
        <Text style={styles.name}>Alexandre Torres</Text>
        <Text style={styles.role}>Aluno</Text>
        <Text style={styles.email}>aluno@spacelearn.com</Text>
      </View>

      {/* Blocos de ações */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionItem} onPress={() => Alert.alert('Editar perfil')}>
          <View style={styles.actionContent}>
            <Feather name="edit" size={20} color="#0C0931" />
            <Text style={styles.actionText}>Editar Perfil</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem} onPress={() => Alert.alert('Alterar senha')}>
          <View style={styles.actionContent}>
            <MaterialIcons name="lock-outline" size={20} color="#0C0931" />
            <Text style={styles.actionText}>Alterar Senha</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem} onPress={() => router.push('/configuracao')}>
          <View style={styles.actionContent}>
            <Ionicons name="settings-outline" size={20} color="#0C0931" />
            <Text style={styles.actionText}>Configurações</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionItem, styles.logoutButton]} onPress={handleLogout}>
          <View style={styles.actionContent}>
            <MaterialIcons name="logout" size={20} color="#fff" />
            <Text style={styles.logoutText}>Sair da Conta</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Versão do app */}
      <View style={styles.footer}>
        <Text style={styles.versionText}>Versão 1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1856',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 20,
    padding: 10,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: '#F2F2F7',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#0C0931',
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    color: '#0C0931',
    fontWeight: 'bold',
  },
  role: {
    fontSize: 16,
    color: '#888',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: '#555',
  },
  actionsContainer: {
    marginTop: 30,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 20,
    gap: 20,
  },
  actionItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  actionText: {
    fontSize: 18,
    color: '#0C0931',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#E80074',
    borderRadius: 8,
    marginTop: 20,
    borderBottomWidth: 0, // remove linha separadora
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    color: '#F2F2F7',
  },
});