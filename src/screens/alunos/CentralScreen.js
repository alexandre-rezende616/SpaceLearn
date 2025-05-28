import { useRouter } from 'expo-router'; // Embora não usado para navegação ainda, é bom ter
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity, // Para futuros cliques em aulas
  View,
} from 'react-native';
import LayoutPadrao from '../../components/LayoutPadrao'; // Usando o Layout Padrão
import { useTheme } from '../../context/ThemeContext';
import { fetchAllAulas } from '../../services/aulaService'; // Importar a nova função
import { fetchAllMissoes } from '../../services/missaoService'; // Importar serviço de missões

const getStyles = (theme) => StyleSheet.create({
  // screenContainer herdado do LayoutPadrao
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.accentPrimary,
    marginBottom: 16,
    paddingHorizontal: 16, // Adicionado para alinhar com o conteúdo da FlatList
    paddingTop: 16, // Espaçamento superior para o título
  },
  segmentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  segmentButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  segmentButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundPrimary,
  },
  listContentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  // Estilos para o card de missão (pode ser similar ao aulaCard ou customizado)
  missaoCard: {
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
  missaoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  missaoDescricao: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  missaoInfo: {
    fontSize: 12,
    color: theme.colors.textTertiary || theme.colors.textSecondary,
  },
});

export default function CentralScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [activeSegment, setActiveSegment] = useState('aulas'); // 'aulas' ou 'missoes'
  const [aulas, setAulas] = useState([]);
  const [missoes, setMissoes] = useState([]);
  const [loadingAulas, setLoadingAulas] = useState(true);
  const [loadingMissoes, setLoadingMissoes] = useState(false);

  const nomeDasAbas = { aulas: "Aulas", missoes: "Missões" };

  useEffect(() => {
    const carregarAulas = async () => {
      setLoadingAulas(true); // Corrigido: usar setLoadingAulas
      try {
        const dataAulas = await fetchAllAulas();
        setAulas(dataAulas);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar as aulas disponíveis.');
        console.error("Erro ao carregar todas as aulas:", error);
      } finally {
        setLoadingAulas(false);
      }
    };
    carregarAulas();
  }, []);

  useEffect(() => {
    const carregarMissoes = async () => {
      if (activeSegment === 'missoes' && missoes.length === 0) { // Carrega apenas se a aba estiver ativa e as missões ainda não foram carregadas
        setLoadingMissoes(true);
        try {
          const dataMissoes = await fetchAllMissoes();
          setMissoes(dataMissoes);
        } catch (error) {
          Alert.alert('Erro', 'Não foi possível carregar as missões.');
          console.error("Erro ao carregar missões:", error);
        } finally {
          setLoadingMissoes(false);
        }
      }
    };
    carregarMissoes();
  }, [activeSegment, missoes.length]); // Adicionado missoes.length para evitar recarregamentos desnecessários se já tiver dados

  // Mostra loading geral se ambas as seções estiverem carregando ou a primeira seção (aulas) ainda não carregou
  if (loadingAulas || (activeSegment === 'aulas' && aulas.length === 0)) { //  Melhoria: loading geral para aulas
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.accentPrimary} />
      </View>
    );
  }

  return (
    <LayoutPadrao>
      <Text style={styles.headerTitle}>Central de Aulas e Missões</Text>

      <View style={styles.segmentContainer}>
        {Object.keys(nomeDasAbas).map((key) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.segmentButton,
              { backgroundColor: activeSegment === key ? theme.colors.accentPrimary : theme.colors.backgroundSecondary }
            ]}
            onPress={() => setActiveSegment(key)}
          >
            <Text style={[
              styles.segmentButtonText,
              { color: activeSegment === key ? theme.colors.buttonPrimaryText : theme.colors.textSecondary }
            ]}>
              {nomeDasAbas[key]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeSegment === 'aulas' && (
        loadingAulas ? <ActivityIndicator color={theme.colors.accentPrimary} style={{marginTop: 20}} /> : aulas.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>Nenhuma aula disponível no momento.</Text>
          </View>
        ) : (
          <FlatList
            data={aulas}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContentContainer}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.aulaCard}
                onPress={() => router.push(`/(stack-only)/aluno/aula/${item.id}`)}
              >
                <Text style={styles.aulaTitulo}>{item.titulo}</Text>
                <Text style={styles.aulaConteudoPreview} numberOfLines={3}>{item.conteudo}</Text>
                <Text style={styles.aulaData}>Publicada em: {new Date(item.dataPublicacao).toLocaleDateString()}</Text>
              </TouchableOpacity>
            )}
          />
        )
      )}

      {activeSegment === 'missoes' && (
        loadingMissoes ? <ActivityIndicator color={theme.colors.accentPrimary} style={{marginTop: 20}} /> : missoes.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>Nenhuma missão disponível no momento.</Text>
          </View>
        ) : (
          <FlatList
            data={missoes}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContentContainer}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.missaoCard}
                onPress={() => router.push(`/(stack-only)/aluno/missao/${item.id}`)}
              >
                <Text style={styles.missaoTitulo}>{item.titulo}</Text>
                <Text style={styles.missaoDescricao} numberOfLines={2}>{item.descricao}</Text>
                <Text style={styles.missaoInfo}>Tipo: {item.tipo}</Text>
                <Text style={styles.missaoInfo}>Status: {item.status}</Text>
                <Text style={styles.missaoInfo}>Recompensa: {item.recompensa}</Text>
                {item.dataEntrega && <Text style={styles.missaoInfo}>Entrega: {new Date(item.dataEntrega).toLocaleDateString()}</Text>}
              </TouchableOpacity>
            )}
          />
        )
      )}
    </LayoutPadrao>
  );
}