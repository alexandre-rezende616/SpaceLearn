// src/screens/professor/ContaProfessorScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../../context/ThemeContext'; // Importe o hook useTheme
import { useAuth } from '../../context/AuthContext'; // Importar o hook useAuth

// Defina estilos base que não mudam com o tema
const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 20,
    padding: 10,
    zIndex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20, // Espaço para o botão de voltar
    marginBottom: 30,
    padding: 20,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  avatar: {
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  role: {
    fontSize: 16,
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    marginBottom: 5,
  },
  infoDetail: {
    fontSize: 14,
    marginBottom: 5,
  },
  actionsContainer: {
    borderRadius: 12,
    paddingHorizontal: 10, // Ajustado
    paddingVertical: 5,    // Ajustado
    gap: 0, // Usar margin no actionItem
  },
  actionItem: {
    paddingVertical: 15, // Aumentado
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  actionText: {
    fontSize: 18,
    fontWeight: '500',
  },
  logoutButton: {
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 5, // Adicionado para espaçamento
    borderBottomWidth: 0,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center', // Centralizar texto
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
  },
});

export default function ContaProfessorScreen() {
  const router = useRouter();
  const { theme } = useTheme(); // Use o hook para acessar o tema
  const { user, logout } = useAuth(); // Obter o usuário e a função logout do AuthContext

  // A informação de matéria principal não vem diretamente do objeto user do AuthContext.
  // Isso precisaria ser carregado separadamente se necessário.

  const handleLogout = async () => { // Marcar como async
    Alert.alert('Sair', 'Tem certeza que deseja sair da conta?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', onPress: async () => {
          try {
            await logout(); // Chamar a função logout do AuthContext
            // A função logout no AuthContext deve cuidar do redirecionamento.
            // Se não estiver redirecionando, o problema está na implementação do logout no AuthContext.
          } catch (error) {
            console.error("Erro ao fazer logout:", error);
            Alert.alert("Erro", error.message || "Não foi possível sair da conta. Verifique o console.");
          }
        }
      },
    ]);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View style={[baseStyles.container, { backgroundColor: theme.colors.backgroundPrimary }]}>
      {/* Botão de Voltar */}
      <TouchableOpacity onPress={handleGoBack} style={baseStyles.backButton}>
        <Ionicons name="arrow-back" size={38} color={theme.colors.textPrimary} />
      </TouchableOpacity>

      {/* Perfil do professor */}
      <View style={[
        baseStyles.profileContainer,
        {
          backgroundColor: theme.colors.backgroundSecondary,
          shadowColor: theme.isDark ? '#000' : '#A9A9A9',
        }
      ]}>
        <Ionicons
          name="person-circle-outline"
          size={100}
          style={[baseStyles.avatar, { color: theme.colors.textPrimary }]}
        />
        <Text style={[baseStyles.name, { color: theme.colors.textPrimary }]}>{user?.nome || 'Nome do Professor'}</Text>
        <Text style={[baseStyles.role, { color: theme.colors.textSecondary }]}>{user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Perfil'}</Text>
        <Text style={[baseStyles.email, { color: theme.colors.textSecondary }]}>Email: {user?.email || 'professor@example.com'}</Text>
        {/* A matéria principal precisaria de uma lógica diferente para ser exibida,
            pois não está no objeto 'user' básico do AuthContext.
        <Text style={[baseStyles.infoDetail, { color: theme.colors.textSecondary }]}>
          Matéria Principal: {professor.materia}
        </Text> */}
      </View>

      {/* Blocos de ações */}
      <View style={[baseStyles.actionsContainer, { backgroundColor: theme.colors.backgroundSecondary }]}>
        <TouchableOpacity
          style={[baseStyles.actionItem, { borderBottomColor: theme.colors.borderSecondary }]}
          onPress={() => Alert.alert('Editar perfil do Professor')}
        >
          <View style={baseStyles.actionContent}>
            <Feather name="edit" size={20} color={theme.colors.textPrimary} />
            <Text style={[baseStyles.actionText, { color: theme.colors.textPrimary }]}>
              Editar Perfil
            </Text>
          </View>
        </TouchableOpacity>

        {/* Botão Alterar Senha */}
        <TouchableOpacity
          style={[baseStyles.actionItem, { borderBottomColor: theme.colors.borderSecondary }]}
          onPress={() => Alert.alert('Alterar senha do Professor')}
        >
          <View style={baseStyles.actionContent}>
            <MaterialIcons name="lock-outline" size={20} color={theme.colors.textPrimary} />
            <Text style={[baseStyles.actionText, { color: theme.colors.textPrimary }]}>
              Alterar Senha
            </Text>
          </View>
        </TouchableOpacity>

        {/* Botão Configurações */}
        <TouchableOpacity
          style={[baseStyles.actionItem, { borderBottomColor: theme.colors.borderSecondary }]}
          onPress={() => router.push('/configuracao')}
        >
          <View style={baseStyles.actionContent}>
            <Ionicons name="settings-outline" size={20} color={theme.colors.textPrimary} />
            <Text style={[baseStyles.actionText, { color: theme.colors.textPrimary }]}>
              Configurações
            </Text>
          </View>
        </TouchableOpacity>
        {/* Adicione outras ações específicas para professores aqui, se necessário */}

        <TouchableOpacity
          style={[
            baseStyles.actionItem,
            baseStyles.logoutButton,
            { backgroundColor: theme.colors.accentSecondary }
          ]}
          onPress={handleLogout}
        >
          <View style={[baseStyles.actionContent, { justifyContent: 'center' }]}>
            <MaterialIcons name="logout" size={20} color={theme.colors.buttonSecondaryText} />
            <Text style={[baseStyles.logoutText, { color: theme.colors.buttonSecondaryText }]}>
              Sair da Conta
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Versão do app (opcional) */}
      <View style={baseStyles.footer}>
        <Text style={[baseStyles.versionText, { color: theme.colors.textSecondary }]}>
          SpaceLearn Professor Portal v1.0.0
        </Text>
      </View>
    </View>
  );
}
