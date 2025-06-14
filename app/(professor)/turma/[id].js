import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../src/context/ThemeContext';
import turmasMock from '../../../src/data/turmasMock'; // Para obter o nome da turma
import alunosPorTurmaData from '../../../src/data/alunosPorTurma'; // Para obter os alunos

console.log('Debug: turmasMock importado:', turmasMock); // Adicione este log

const getStyles = (theme) => StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20, // Ajuste conforme necessário para status bar
    paddingBottom: 12,
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
  contentContainer: {
    padding: 20,
  },
  turmaInfoContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    color: theme.colors.textPrimary,
    fontWeight: '500',
  },
  alunosTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 10,
  },
  alunoCard: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  alunoNome: {
    fontSize: 16,
    color: theme.colors.textPrimary,
    fontWeight: '500',
  },
  alunoDetalhes: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
});

export default function DetalhesTurmaScreen() {
  const router = useRouter();
  const { id: turmaId } = useLocalSearchParams(); // Pega o 'id' da URL
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [turma, setTurma] = useState(null);
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (turmaId) {
      const turmaEncontrada = turmasMock.find(t => t.id === turmaId);
      setTurma(turmaEncontrada);

      if (turmaEncontrada) {
        // Ajusta o nome da turma para corresponder às chaves em alunosPorTurmaData
        // Ex: "Turma Orion" -> "Orion"
        const nomeChaveAlunos = turmaEncontrada.nome.replace(/^Turma\s*/, '');
        if (alunosPorTurmaData[nomeChaveAlunos]) {
          setAlunos(alunosPorTurmaData[nomeChaveAlunos]);
        } else {
          console.warn(`Nenhum aluno encontrado para a chave: ${nomeChaveAlunos} em alunosPorTurmaData`);
          setAlunos([]); // Nenhum aluno encontrado para esta turma
        }
      } else {
        setAlunos([]); // Nenhum aluno encontrado para esta turma
      }
      setLoading(false);
    }
  }, [turmaId]);

  if (loading) {
    return <View style={[styles.loadingContainer, { backgroundColor: theme.colors.backgroundPrimary }]}><ActivityIndicator size="large" color={theme.colors.accentPrimary} /></View>;
  }

  if (!turma) {
    return <View style={styles.screenContainer}><Text style={styles.emptyText}>Turma não encontrada.</Text></View>;
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{turma.nome}</Text>
      </View>
      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={() => (
          <View style={styles.turmaInfoContainer}>
            <Text style={styles.infoLabel}>Número de Alunos:</Text>
            <Text style={styles.infoValue}>{turma.alunos}</Text>
            <Text style={[styles.infoLabel, { marginTop: 10 }]}>Última Atividade:</Text>
            <Text style={styles.infoValue}>{turma.ultimaAtividade}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.alunoCard}>
            <Text style={styles.alunoNome}>{item.nome} {item.sobrenome}</Text>
            <Text style={styles.alunoDetalhes}>Progresso: {item.progresso} | Atividades: {item.atividadesConcluidas}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum aluno encontrado nesta turma.</Text>}
      />
    </View>
  );
}

