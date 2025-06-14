import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useState, useCallback } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View, RefreshControl } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import materiasFromMock from '../../data/materiasMock'; // Importando matérias do mock
import turmasFromMock from '../../data/turmasMock';   // Importando turmas do mock

// Defina estilos base que não mudam com o tema
const baseStyles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 20, // Espaço no final da rolagem
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 38, // Ajustado para dar espaço ao status bar
    paddingBottom: 10,
  },
  headerActions: { // Novo estilo para agrupar os botões de ação
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10, // Espaço entre os botões
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  addButton: {
    padding: 8,
    borderRadius: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  materiaContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  materiaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  turmaCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    // A cor de fundo será definida dinamicamente
  },
  turmaNome: {
    fontSize: 18,
    fontWeight: '600',
  },
  turmaDetalhes: {
    fontSize: 14,
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
  },
});

export default function TurmasScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [materias, setMaterias] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groupedTurmas, setGroupedTurmas] = useState({});


  const carregarDados = useCallback(async () => {
    setLoading(true);
    console.log("Iniciando carregamento de dados mocados...");
    try {
      // Simula um pequeno atraso, como se estivesse carregando da rede
      await new Promise(resolve => setTimeout(resolve, 500));

      const materiasData = materiasFromMock;
      const turmasData = turmasFromMock;

      setMaterias(materiasData);
      setTurmas(turmasData);

      if (!materiasData || materiasData.length === 0 || !turmasData) {
        console.warn("Dados mocados de matérias ou turmas não estão definidos corretamente ou estão vazios.");
        setGroupedTurmas({});
      } else {
        console.log("Matérias mocadas:", materiasData);
        console.log("Turmas mocadas:", turmasData);

        // Agrupar turmas por matéria
        const grouped = materiasData.reduce((acc, materia) => {
          acc[materia.id] = {
            ...materia,
            turmas: turmasData.filter(turma => turma.materiaId === materia.id),
          };
          return acc;
        }, {});
        setGroupedTurmas(grouped);
        console.log("Turmas agrupadas:", grouped);
      }

    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao processar os dados simulados.");
      console.error("Erro ao carregar dados simulados:", error);
    } finally {
      setLoading(false);
      console.log("Carregamento de dados finalizado.");
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      carregarDados();
    }, [carregarDados])
  );

  if (loading && Object.keys(groupedTurmas).length === 0) {
    return (
      <View style={[baseStyles.loadingContainer, { backgroundColor: theme.colors.backgroundPrimary }]}>
        <ActivityIndicator size="large" color={theme.colors.accentPrimary} />
        <Text style={{ color: theme.colors.textSecondary, marginTop: 10 }}>Carregando turmas...</Text>
      </View>
    );
  }

  return (
    <View style={[baseStyles.screenWrapper, { backgroundColor: theme.colors.backgroundPrimary }]}>
      <ScrollView
        contentContainerStyle={baseStyles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={carregarDados} colors={[theme.colors.accentPrimary]} tintColor={theme.colors.accentPrimary} />
        }
      >
        <View style={baseStyles.headerContainer}>
          <Text style={[baseStyles.title, { color: theme.colors.textPrimary }]}>Minhas Turmas</Text>
          <View style={baseStyles.headerActions}>
            <TouchableOpacity style={[baseStyles.addButton, { backgroundColor: theme.colors.accentSecondary }]} onPress={() => router.push('/(professor)/materia/nova')}>
              <Ionicons name="library-outline" size={24} color={theme.colors.buttonSecondaryText} />
            </TouchableOpacity>
            <TouchableOpacity style={[baseStyles.addButton, { backgroundColor: theme.colors.accentPrimary }]} onPress={() => router.push('/(professor)/turma/nova')}>
              <Ionicons name="add-circle-outline" size={28} color={theme.colors.buttonPrimaryText} />
            </TouchableOpacity>
          </View>
        </View>

        {Object.keys(groupedTurmas).length === 0 && !loading ? (
          <Text style={[baseStyles.emptyText, { color: theme.colors.textSecondary }]}>
            Nenhuma turma encontrada. Crie uma nova!
          </Text>
        ) : (
          Object.values(groupedTurmas).map((materia) => (
            <View key={materia.id} style={[baseStyles.materiaContainer, { backgroundColor: theme.colors.backgroundSecondary, shadowColor: theme.isDark ? '#000' : '#ccc' }]}>
              <Text style={[baseStyles.materiaTitle, { color: theme.colors.accentPrimary }]}>{materia.nome}</Text>
              {materia.turmas && materia.turmas.length > 0 ? (
                materia.turmas.map((turma) => (
                  <TouchableOpacity
                    key={turma.id}
                    style={[baseStyles.turmaCard, { backgroundColor: theme.colors.backgroundPrimary }]}
                    onPress={() => router.push(`/(professor)/turma/${turma.id}`)}
                  >
                    <Text style={[baseStyles.turmaNome, { color: theme.colors.textPrimary }]}>{turma.nome}</Text>
                    <Text style={[baseStyles.turmaDetalhes, { color: theme.colors.textSecondary }]}>
                      Alunos: {turma.alunos} | Última Atividade: {turma.ultimaAtividade}
                    </Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={[baseStyles.turmaDetalhes, { color: theme.colors.textSecondary, textAlign: 'center' }]}>
                  Nenhuma turma para esta matéria.
                </Text>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
