import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { fetchAulasPorTurma } from '../../../services/aulaService';
import { fetchTurmas } from '../../../services/turmaService';

const getStyles = (theme) => StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: theme.colors.backgroundSecondary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundPrimary,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  aulaCard: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: theme.isDark ? '#000' : '#A9A9A9',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  aulaTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  aulaConteudoPreview: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  aulaData: {
    fontSize: 12,
    color: theme.colors.textTertiary || theme.colors.textSecondary,
  },
});

export default function ListaAulasScreen() {
  const router = useRouter();
  const { nomeDaTurma } = useLocalSearchParams();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [aulas, setAulas] = useState([]);
  const [turmaId, setTurmaId] = useState(null);
  const [loading, setLoading] = useState(true);
  const nomeTurmaDecodificado = decodeURIComponent(nomeDaTurma || '');

  useEffect(() => {
    const carregarDados = async () => {
      if (!nomeDaTurma) return;
      setLoading(true);
      try {
        const todasTurmas = await fetchTurmas();
        const turmaEncontrada = todasTurmas.find(
          (t) => t.nome === `Turma ${nomeTurmaDecodificado}`
        );

        if (turmaEncontrada) {
          setTurmaId(turmaEncontrada.id);
          const aulasDaTurma = await fetchAulasPorTurma(turmaEncontrada.id);
          setAulas(aulasDaTurma);
        } else {
          Alert.alert('Erro', `Turma "${nomeTurmaDecodificado}" não encontrada.`);
          router.back();
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar as aulas.');
        console.error("Erro ao carregar aulas:", error);
      } finally {
        setLoading(false);
      }
    };
    carregarDados();
  }, [nomeDaTurma, router]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.accentPrimary} />
        <Text style={{ color: theme.colors.textSecondary, marginTop: 10 }}>Carregando aulas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Aulas da Turma {nomeTurmaDecodificado}</Text>
      </View>
      <View style={styles.contentContainer}>
        {aulas.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>Nenhuma aula publicada para esta turma ainda.</Text>
          </View>
        ) : (
          <FlatList
            data={aulas}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.aulaCard}>
                <Text style={styles.aulaTitulo}>{item.titulo}</Text>
                <Text style={styles.aulaConteudoPreview} numberOfLines={2}>{item.conteudo}</Text>
                <Text style={styles.aulaData}>Publicada em: {new Date(item.dataPublicacao).toLocaleDateString()}</Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}