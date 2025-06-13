import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { fetchMaterias, deleteMateria } from '../../../services/materiaService'; // Importar deleteMateria

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
  materiaDescricao: { // Movido para cá para consistência, pode ser o mesmo estilo
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Alinha botões à direita
    marginTop: 10,
  },
  actionButton: {
    marginLeft: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20, // Bordas mais arredondadas
  },
  deleteButtonText: {
    color: theme.colors.buttonSecondaryText, // Texto branco para botão de perigo
    fontWeight: 'bold',
  },
});

export default function GerenciarMateriasScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false); // Estado para feedback de exclusão

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

  const handleConfirmDelete = (materiaId, materiaNome) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja excluir a matéria "${materiaNome}"? Esta ação não pode ser desfeita.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            setDeleting(true);
            try {
              await deleteMateria(materiaId);
              Alert.alert('Sucesso', `Matéria "${materiaNome}" excluída.`);
              carregarMaterias(); // Recarrega a lista
            } catch (err) {
              Alert.alert('Erro ao Excluir', err.message || 'Não foi possível excluir a matéria.');
            } finally {
              setDeleting(false);
            }
          },
        },
      ]
    );
  };

  if (loading && materias.length === 0) { // Mostra loading inicial apenas se não houver matérias
    return <View style={styles.loadingContainer}><ActivityIndicator size="large" color={theme.colors.accentPrimary} /></View>;
  }

  const renderMateria = ({ item }) => (
    <View style={styles.materiaCard}>
      <Text style={styles.materiaNome}>{item.nome}</Text>
      {item.descricao ? <Text style={styles.materiaDescricao}>{item.descricao}</Text> : <Text style={styles.materiaDescricao}>Sem descrição.</Text>}
      {item.professorResponsavel ? <Text style={styles.materiaProfessor}>Prof. Responsável: {item.professorResponsavel}</Text> : <Text style={styles.materiaProfessor}>Professor não definido.</Text>}
      <View style={styles.actionsContainer}>
        {/* Futuramente: Botão de Editar */}
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.colors.accentSecondary }]} onPress={() => handleConfirmDelete(item._id, item.nome)} disabled={deleting}>
          <Text style={styles.deleteButtonText}>{deleting ? 'Excluindo...' : 'Excluir'}</Text>
        </TouchableOpacity>
      </View>
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
      {loading && <ActivityIndicator style={{ marginVertical: 10 }} color={theme.colors.accentPrimary} />}
      {materias.length > 0 ? (
        <FlatList
          data={materias}
          renderItem={renderMateria}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.emptyText}>Nenhuma matéria cadastrada ainda. Clique em '+' para adicionar.</Text>
      )}
    </View>
  );
}