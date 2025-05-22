import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import ProfessorAccountIcon from '@/components/ProfessorAccountIcon'; // Importar o ícone

import { useTheme } from '../../context/ThemeContext'; // Importe o hook useTheme

// Defina estilos base que não mudam com o tema
const baseStyles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Alinha o ícone à direita
    paddingHorizontal: 15, // Espaçamento nas laterais da barra
    paddingTop: 35, // Ajustado para descer o ícone
    paddingBottom: 5, // Espaçamento abaixo do ícone
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 20, // Espaçamento do topo do conteúdo rolável
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: '30%',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  statLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionCard: {
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: '30%',
  },
  actionText: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default function PainelScreen() {
  const { theme } = useTheme(); // Use o hook para acessar o tema

  return (
    <View style={[baseStyles.screenWrapper, { backgroundColor: theme.colors.backgroundPrimary }]}>
      <View style={[baseStyles.headerBar, { backgroundColor: theme.colors.backgroundPrimary }]}>
        <ProfessorAccountIcon />
      </View>
      <ScrollView contentContainerStyle={baseStyles.scrollContainer}>
        <Text style={[baseStyles.title, { color: theme.colors.textPrimary }]}>Painel de Controle</Text>
        <Text style={[baseStyles.subtitle, { color: theme.colors.textSecondary }]}>Bem-vindo de volta, Professor!</Text>
        <View style={baseStyles.statsContainer}>
          <View style={[baseStyles.statCard, { backgroundColor: theme.colors.backgroundSecondary }]}>
            <Ionicons name="book-outline" size={24} color={theme.colors.accentPrimary} />
            <Text style={[baseStyles.statNumber, { color: theme.colors.textPrimary }]}>3</Text>
            <Text style={[baseStyles.statLabel, { color: theme.colors.textSecondary }]}>Matérias</Text>
          </View>
          <View style={[baseStyles.statCard, { backgroundColor: theme.colors.backgroundSecondary }]}>
            <FontAwesome5 name="user-astronaut" size={24} color={theme.colors.accentPrimary} />
            <Text style={[baseStyles.statNumber, { color: theme.colors.textPrimary }]}>56</Text>
            <Text style={[baseStyles.statLabel, { color: theme.colors.textSecondary }]}>Alunos</Text>
          </View>
          <View style={[baseStyles.statCard, { backgroundColor: theme.colors.backgroundSecondary }]}>
            <Ionicons name="rocket-outline" size={24} color={theme.colors.accentPrimary} />
            <Text style={[baseStyles.statNumber, { color: theme.colors.textPrimary }]}>12</Text>
            <Text style={[baseStyles.statLabel, { color: theme.colors.textSecondary }]}>Missões</Text>
          </View>
        </View>

        <Text style={[baseStyles.sectionTitle, { color: theme.colors.textPrimary }]}>Ações rápidas</Text>
        <View style={baseStyles.actionsContainer}>
          <TouchableOpacity
            style={[baseStyles.actionCard, { backgroundColor: theme.colors.accentSecondary }]}
            onPress={() => console.log('Publicar aula pressionado')}
          >
            <Ionicons name="create-outline" size={28} color={theme.colors.buttonSecondaryText} />
            <Text style={[baseStyles.actionText, { color: theme.colors.buttonSecondaryText }]}>Publicar aula</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[baseStyles.actionCard, { backgroundColor: theme.colors.accentSecondary }]}
            onPress={() => console.log('Atribuir medalhas pressionado')}
          >
            <Ionicons name="trophy-outline" size={28} color={theme.colors.buttonSecondaryText} />
            <Text style={[baseStyles.actionText, { color: theme.colors.buttonSecondaryText }]}>Atribuir medalhas</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[baseStyles.actionCard, { backgroundColor: theme.colors.accentSecondary }]}
            onPress={() => console.log('Ver progresso pressionado')}
          >
            <Ionicons name="analytics-outline" size={28} color={theme.colors.buttonSecondaryText} />
            <Text style={[baseStyles.actionText, { color: theme.colors.buttonSecondaryText }]}>Ver progresso</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>      
    </View>
  );
}