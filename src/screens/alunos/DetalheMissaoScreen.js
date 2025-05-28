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
import { fetchMissaoPorId } from '../../services/missaoService';

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
    flexShrink: 1,
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
  missaoTitulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.accentPrimary,
    marginBottom: 12,
  },
  missaoInfoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
    marginTop: 10,
    marginBottom: 4,
  },
  missaoInfoTexto: {
    fontSize: 16,
    color: theme.colors.textPrimary,
    marginBottom: 10,
    lineHeight: 22,
  },
  errorText: {
    fontSize: 16,
    color: theme.colors.error,
    textAlign: 'center',
  }
});

export default function DetalheMissaoScreen() {
  const router = useRouter();
  const { missaoId } = useLocalSearchParams();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [missao, setMissao] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (missaoId) {
      const carregarMissao = async () => {
        setLoading(true);
        setError(null);
        try {
          const missaoData = await fetchMissaoPorId(missaoId);
          setMissao(missaoData);
        } catch (err) {
          setError(err.message || 'Não foi possível carregar os detalhes da missão.');
          Alert.alert('Erro', err.message || 'Não foi possível carregar os detalhes da missão.');
        } finally {
          setLoading(false);
        }
      };
      carregarMissao();
    } else {
      setError('ID da missão não fornecido.');
      setLoading(false);
    }
  }, [missaoId]);

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
        <Text style={styles.headerTitle} numberOfLines={1}>{missao ? missao.titulo : 'Detalhes da Missão'}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {error && <Text style={styles.errorText}>{error}</Text>}
        {missao && !error && (
          <>
            <Text style={styles.missaoTitulo}>{missao.titulo}</Text>
            <Text style={styles.missaoInfoLabel}>Descrição:</Text>
            <Text style={styles.missaoInfoTexto}>{missao.descricao}</Text>
            <Text style={styles.missaoInfoLabel}>Tipo:</Text>
            <Text style={styles.missaoInfoTexto}>{missao.tipo}</Text>
            <Text style={styles.missaoInfoLabel}>Status:</Text>
            <Text style={styles.missaoInfoTexto}>{missao.status}</Text>
            <Text style={styles.missaoInfoLabel}>Recompensa:</Text>
            <Text style={styles.missaoInfoTexto}>{missao.recompensa}</Text>
            {missao.dataEntrega && <Text style={styles.missaoInfoLabel}>Data de Entrega:</Text>}
            {missao.dataEntrega && <Text style={styles.missaoInfoTexto}>{new Date(missao.dataEntrega).toLocaleDateString()}</Text>}
          </>
        )}
      </ScrollView>
    </View>
  );
}