// c:\Users\xandi\SpaceLearn\src\screens\professor\turma\AulasDaTurmaScreen.js
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { fetchAulasPorTurmaNome } from '../../../services/aulaService'; // Importar o serviço

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
  },
  listContainer: {
    padding: 16,
  },
  aulaCard: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 12,
    padding: 15,
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
    marginBottom: 5,
  },
  aulaDescricao: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  aulaData: {
    fontSize: 12,
    color: theme.colors.textDisabled,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
});

export default function AulasDaTurmaScreen() {
  const router = useRouter();
  const { nomeDaTurma } = useLocalSearchParams();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [aulas, setAulas] = useState([]);
  const [loading, setLoading] = useState(true);

  const turmaNomeDecodificado = nomeDaTurma ? decodeURIComponent(nomeDaTurma) : 'Desconhecida';

  useEffect(() => {
    if (turmaNomeDecodificado && turmaNomeDecodificado !== 'Desconhecida') {
      fetchAulasPorTurmaNome(turmaNomeDecodificado)
        .then(setAulas)
        .catch(err => console.error("Erro ao buscar aulas:", err))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [turmaNomeDecodificado]);

  if (loading) {
    return <View style={styles.loadingContainer}><ActivityIndicator size="large" color={theme.colors.accentPrimary} /></View>;
  }

  const renderAula = ({ item }) => (
    <TouchableOpacity
      style={styles.aulaCard}
      onPress={() => {
        router.push(`/(stack-only)/turma/aula/${item.id}`); // Passa o ID da aula para a rota
      }}
    >
      <Text style={styles.aulaTitulo}>{item.titulo}</Text>
      {item.descricao ? <Text style={styles.aulaDescricao}>{item.descricao}</Text> : null}
      <Text style={styles.aulaData}>Publicada em: {item.dataPublicacao}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Aulas da Turma: {turmaNomeDecodificado}</Text>
      </View>
      {aulas.length > 0 ? (
        <FlatList
          data={aulas}
          renderItem={renderAula}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.emptyText}>Nenhuma aula publicada para esta turma ainda.</Text>
      )}
    </View>
  );
}
