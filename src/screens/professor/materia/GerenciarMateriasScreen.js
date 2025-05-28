import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { fetchMaterias } from '../../../services/materiaService';

const getStyles = (theme) => StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: theme.colors.backgroundSecondary,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  addButton: {
    padding: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
  },
  materiaCard: {
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
  materiaNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 5,
  },
  materiaDescricao: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  materiaProfessor: {
    fontSize: 13,
    color: theme.colors.textDisabled,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
});

export default function GerenciarMateriasScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarMaterias = () => {
    setLoading(true);
    fetchMaterias()
      .then(setMaterias)
      .catch(err => {
        console.error("Erro ao buscar matérias:", err);
        Alert.alert("Erro", "Não foi possível carregar as matérias.");
      })
      .finally(() => setLoading(false));
  };

  // useFocusEffect para recarregar a lista quando a tela recebe foco (após criar uma nova matéria)
  useFocusEffect(
    React.useCallback(() => {
      carregarMaterias();
    }, [])
  );

  if (loading) {
    return <View style={styles.loadingContainer}><ActivityIndicator size="large" color={theme.colors.accentPrimary} /></View>;
  }

  const renderMateria = ({ item }) => (
    <View style={styles.materiaCard}>
      <Text style={styles.materiaNome}>{item.nome}</Text>
      {item.descricao ? <Text style={styles.materiaDescricao}>{item.descricao}</Text> : null}
      {item.professorResponsavel ? <Text style={styles.materiaProfessor}>Prof. Responsável: {item.professorResponsavel}</Text> : null}
      {/* TODO: Adicionar botões de Editar/Excluir aqui */}
    </View>
  );

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 8, marginRight: 10 }}><Ionicons name="arrow-back" size={28} color={theme.colors.textPrimary} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Gerenciar Matérias</Text>
        <TouchableOpacity onPress={() => router.push('/(stack-only)/professor/materia/nova')} style={styles.addButton}>
          <MaterialCommunityIcons name="plus-circle" size={30} color={theme.colors.accentPrimary} />
        </TouchableOpacity>
      </View>
      {materias.length > 0 ? (
        <FlatList
          data={materias}
          renderItem={renderMateria}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.emptyText}>Nenhuma matéria cadastrada ainda. Clique em '+' para adicionar.</Text>
      )}
    </View>
  );
}