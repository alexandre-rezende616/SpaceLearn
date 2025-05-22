import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext'; // Alterado para usar o ThemeContext do projeto
import ProfessorAccountIcon from '@/components/ProfessorAccountIcon'; // Adicionado para o ícone da conta

const missoes = [
  {
    id: '1',
    titulo: 'Missão 01: Construindo um Satélite',
    turma: 'Órbita 1',
    prazo: '15/05/2025',
    status: 'Aberta',
  },
  {
    id: '2',
    titulo: 'Missão 02: Avaliando Riscos Espaciais',
    turma: 'Galáxia 2',
    prazo: '20/05/2025',
    status: 'Em andamento',
  },
  {
    id: '3',
    titulo: 'Missão 03: Aplicações de Componentes',
    turma: 'Estação 3',
    prazo: '25/05/2025',
    status: 'Concluída',
  },
];

export default function MissoesScreen() {
  const { theme } = useTheme(); // Acessa o objeto 'theme' do ThemeContext
  const styles = getStyles(theme); // Gera os estilos baseados no tema

  return (
    <View style={styles.screenWrapper}>
      <View style={styles.headerBar}>
        <ProfessorAccountIcon />
      </View>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContentContainer}
      >
        <Text style={styles.titulo}>Missões Cadastradas</Text>
        {missoes.map((missao) => (
          <View key={missao.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="rocket-outline" size={24} color={theme.colors.accentPrimary} style={styles.icon} />
              <Text style={styles.cardTitulo}>{missao.titulo}</Text>
            </View>

            <Text style={styles.cardInfo}>Turma: {missao.turma}</Text>
            <Text style={styles.cardInfo}>Prazo: {missao.prazo}</Text>
            <Text style={styles.cardStatus(missao.status)}>
              Status: {missao.status}
            </Text>

            <View style={styles.cardBotoes}>
              <TouchableOpacity style={[styles.botaoBase, styles.botaoEditar]}>
                <FontAwesome5 name="edit" size={16} color={theme.colors.buttonPrimaryText} />
                <Text style={styles.botaoEditarTexto}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.botaoBase, styles.botaoVerProgresso]}>
                <Ionicons name="analytics-outline" size={18} color={theme.colors.buttonSecondaryText} />
                <Text style={styles.botaoVerProgressoTexto}>Ver Progresso</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// Transforma StyleSheet.create em uma função que aceita o objeto 'theme'
const getStyles = (theme) => StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    paddingTop: 35, // Ajustado para descer o ícone
    paddingBottom: 5,
    backgroundColor: theme.colors.backgroundPrimary, // Garante que a barra tenha a mesma cor de fundo
  },
  scrollView: { // Estilo para o ScrollView em si, se necessário
    flex: 1,
  },
  scrollContentContainer: { // Estilo para o conteúdo dentro do ScrollView
    padding: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 16,
  },
  card: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: theme.isDark ? '#000' : '#A9A9A9', // Com base no tema, como em outras telas
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 8,
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  cardInfo: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  cardStatus: (status) => ({
    fontSize: 14,
    // Usando cores do tema, com fallbacks se chaves específicas de status não existirem
    color: status === 'Concluída' ? (theme.colors.statusConcluida || theme.colors.accentPrimary) :
           status === 'Em andamento' ? (theme.colors.statusEmAndamento || theme.colors.warning || '#FFD700') :
           (theme.colors.statusAberta || theme.colors.error || '#E80074'),
    fontWeight: 'bold',
    marginTop: 6,
  }),
  cardBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  botaoBase: { // Estilo base comum para os botões
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  botaoEditar: {
    backgroundColor: theme.colors.buttonPrimaryBackground,
  },
  botaoEditarTexto: {
    marginLeft: 6,
    color: theme.colors.buttonPrimaryText,
    fontWeight: 'bold',
  },
  botaoVerProgresso: {
    backgroundColor: theme.colors.accentSecondary, // Usando accentSecondary como em TurmasScreen
  },
  botaoVerProgressoTexto: {
    marginLeft: 6,
    color: theme.colors.buttonSecondaryText, // Usando buttonSecondaryText como em TurmasScreen
    fontWeight: 'bold',
  },
});