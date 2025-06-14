import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext'; // Importe o hook useTheme
import { useAuth } from '../context/AuthContext'; // Importar o hook useAuth

// Crie uma função para gerar estilos baseados no tema
const createStyles = (theme) => StyleSheet.create({
  // Os estilos que dependem do tema virão aqui
  // Por enquanto, vamos manter os estilos que já foram adaptados inline
  // e os que não foram, serão adaptados abaixo.
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    paddingHorizontal: 20,
    paddingTop: 70, // Aumentado para descer todo o conteúdo
  },
  backButton: {
    position: 'absolute',
    top: 40, // Aumentado para descer o botão abaixo da barra de status
    left: 20,
    padding: 10, // Área de toque maior
    zIndex: 1,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 20, // Adicionado para dar espaço ao botão de voltar
    marginBottom: 40,
    backgroundColor: theme.colors.backgroundSecondary,
    padding: 20,
    borderRadius: 12,
    shadowColor: theme.isDark ? '#000' : '#A9A9A9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  avatarIconStyle: { // Novo estilo para o ícone, se necessário, ou pode ser inline
    marginBottom: 15,
    // A cor e o tamanho serão definidos diretamente no componente Ionicons
  },
  name: {
    fontSize: 24,
    color: theme.colors.textPrimary,
    fontWeight: 'bold',
  },
  role: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  actionsContainer: {
    marginTop: 30,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 12,
    paddingHorizontal: 10, // Ajustado para padding interno
    paddingVertical: 5,    // Ajustado para padding interno
    gap: 0, 
  },
  actionItem: {
    paddingVertical: 15, // Aumentado para melhor toque
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderSecondary,
  },
  actionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  actionText: {
    fontSize: 18,
    color: theme.colors.textPrimary,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: theme.colors.accentSecondary, // Usando cor do tema
    borderRadius: 8,
    marginTop: 10, // Espaçamento
    marginBottom: 5, // Espaçamento
    borderBottomWidth: 0,
  },
  logoutText: {
    color: theme.colors.buttonSecondaryText,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center', // Centralizar texto no botão de logout
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
    color: theme.colors.textSecondary,
  },
});

export default function ContaScreen() {
  const router = useRouter();
  const { theme } = useTheme(); // Use o hook para acessar o tema
  const { user, logout } = useAuth(); // Obter o usuário e a função logout do AuthContext
  const styles = createStyles(theme); // Crie os estilos usando o tema atual

  const handleLogout = async () => { // Marcar como async pois logout no AuthContext é async
    Alert.alert('Sair', 'Tem certeza que deseja sair da conta?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', onPress: async () => {
          await logout(); // Chamar a função logout do AuthContext
          // Navegação direta para a tela de login após o logout
          router.replace('/login');
        }
      },
    ]);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Botão de Voltar - cor do ícone usa cor do tema */}
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={38} color={theme.colors.textPrimary} />
      </TouchableOpacity>

      {/* Perfil do usuário */}
      <View style={styles.profileContainer}>
        <Ionicons
          name="person-circle-outline"
          size={120} // Tamanho grande, similar à imagem anterior
          color={theme.colors.accentPrimary} // Usando a cor de destaque do tema, como a borda da imagem anterior
          style={styles.avatarIconStyle} // Aplicando a margem inferior
        />
        <Text style={styles.name}>{user?.nome || 'Nome do Usuário'}</Text>
        <Text style={styles.role}>{user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Perfil'}</Text>
        <Text style={styles.email}>{user?.email || 'email@example.com'}</Text>
      </View>

      {/* Blocos de ações */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionItem} onPress={() => Alert.alert('Editar perfil')}>
          <View style={styles.actionContent}>
            <Feather name="edit" size={20} color={theme.colors.textPrimary} />
            <Text style={styles.actionText}>Editar Perfil</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem} onPress={() => Alert.alert('Alterar senha')}>
          <View style={styles.actionContent}>
            <MaterialIcons name="lock-outline" size={20} color={theme.colors.textPrimary} />
            <Text style={styles.actionText}>Alterar Senha</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem} onPress={() => router.push('/configuracao')}>
          <View style={styles.actionContent}>
            <Ionicons name="settings-outline" size={20} color={theme.colors.textPrimary} />
            <Text style={styles.actionText}>Configurações</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionItem, styles.logoutButton]} onPress={handleLogout}>
          <View style={styles.actionContent}>
            <MaterialIcons name="logout" size={20} color={theme.colors.buttonSecondaryText} />
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
