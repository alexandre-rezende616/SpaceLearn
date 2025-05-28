// c:\Users\xandi\SpaceLearn\src\screens\professor\materia\FormularioMateriaScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../../context/ThemeContext';
import { criarMateria } from '../../../services/materiaService';

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
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  formLabel: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: theme.colors.inputBackground,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: theme.colors.textPrimary,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary, // Alterado para melhor visibilidade no tema escuro
    marginBottom: 10,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: theme.colors.buttonPrimaryBackground,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: theme.colors.buttonPrimaryText,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default function FormularioMateriaScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [professorResponsavel, setProfessorResponsavel] = useState('');

  const handleSalvarMateria = async () => {
    if (!nome.trim()) {
      Alert.alert('Erro', 'O nome da matéria é obrigatório.');
      return;
    }

    const novaMateriaData = { nome, descricao, professorResponsavel };

    try {
      const materiaCriada = await criarMateria(novaMateriaData);
      Alert.alert('Sucesso', `Matéria "${materiaCriada.nome}" criada!`);
      router.back(); // Volta para a tela anterior (que será a lista de matérias)
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar a matéria.');
      console.error("Erro ao criar matéria:", error);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nova Matéria</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.formLabel}>Nome da Matéria*</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Ex: Física Quântica" placeholderTextColor={theme.colors.textSecondary} />

        <Text style={styles.formLabel}>Descrição</Text>
        <TextInput style={[styles.input, styles.textArea]} value={descricao} onChangeText={setDescricao} multiline placeholder="Breve descrição sobre a matéria" placeholderTextColor={theme.colors.textSecondary} />

        <Text style={styles.formLabel}>Professor Responsável</Text>
        <TextInput style={styles.input} value={professorResponsavel} onChangeText={setProfessorResponsavel} placeholder="Ex: Prof. Dr. Albert Einstein" placeholderTextColor={theme.colors.textSecondary} />

        <TouchableOpacity style={styles.saveButton} onPress={handleSalvarMateria}>
          <Text style={styles.saveButtonText}>Salvar Matéria</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
