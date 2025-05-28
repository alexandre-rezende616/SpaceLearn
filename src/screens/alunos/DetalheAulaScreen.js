import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { fetchAulaPorId } from '../../services/aulaService';

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
    flexShrink: 1, // Para evitar que o título empurre o botão de voltar
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundPrimary,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  aulaTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.accentPrimary,
    marginBottom: 12,
  },
  aulaData: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 20,
  },
  aulaConteudo: {
    fontSize: 16,
    color: theme.colors.textPrimary,
    lineHeight: 24,
  },
  errorText: {
    fontSize: 16,
    color: theme.colors.error,
    textAlign: 'center',
  }
});

export default function DetalheAulaScreen() {
  const router = useRouter();
  const { aulaId } = useLocalSearchParams(); // Recebe o ID da aula da rota
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [aula, setAula] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (aulaId) {
      const carregarAula = async () => {
        setLoading(true);
        setError(null);
        try {
          const aulaData = await fetchAulaPorId(aulaId);
          setAula(aulaData);
        } catch (err) {
          setError(err.message || 'Não foi possível carregar os detalhes da aula.');
          Alert.alert('Erro', err.message || 'Não foi possível carregar os detalhes da aula.');
          // router.back(); // Opcional: voltar automaticamente em caso de erro
        } finally {
          setLoading(false);
        }
      };
      carregarAula();
    } else {
      setError('ID da aula não fornecido.');
      setLoading(false);
    }
  }, [aulaId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.accentPrimary} />
      </View>
    );
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{aula ? aula.titulo : 'Detalhes da Aula'}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {error && <Text style={styles.errorText}>{error}</Text>}
        {aula && !error && (
          <>
            <Text style={styles.aulaTitulo}>{aula.titulo}</Text>
            <Text style={styles.aulaData}>Publicada em: {new Date(aula.dataPublicacao).toLocaleDateString()}</Text>
            <Text style={styles.aulaConteudo}>{aula.conteudo}</Text>
          </>
        )}
      </ScrollView>
    </View>
  );
}