import ProfessorAccountIcon from '@/components/ProfessorAccountIcon';
import alunosPorTurma from '@/data/alunosPorTurma';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function MedalhasScreen() {
  const [selectedTurma, setSelectedTurma] = useState(null);
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [medalName, setMedalName] = useState('');
  const [descricao, setDescricao] = useState('');
  const [assignedMedals, setAssignedMedals] = useState([]);
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const turmas = Object.keys(alunosPorTurma);

  const handleSelectTurma = (turma) => {
    setSelectedTurma(turma);
    setSelectedAluno(null);
  };

  const handleSelectAluno = (aluno) => {
    setSelectedAluno(aluno);
  };

  const handleAssignMedal = () => {
    if (selectedAluno && medalName) {
      const newMedal = {
        id: Date.now().toString(),
        aluno: selectedAluno,
        turma: selectedTurma,
        medalha: medalName,
        descricao: descricao,
        data: new Date().toLocaleDateString(),
      };
      setAssignedMedals(prevMedals => [newMedal, ...prevMedals]);
      setMedalName('');
      setDescricao('');
      setSelectedAluno(null);
      Alert.alert('Sucesso!', `Medalha "${medalName}" atribuída a ${selectedAluno}.`);
    } else {
      Alert.alert('Atenção', 'Por favor, selecione um aluno e defina o nome da medalha.');
    }
  };

  return (
    <View style={styles.screenWrapper}>
      <View style={styles.headerBar}>
        <ProfessorAccountIcon />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Atribuir Medalhas</Text>

        {/* Formulário para criar a medalha */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Detalhes da Medalha</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome da Medalha (Ex: Explorador Estelar)"
            placeholderTextColor={theme.colors.textPlaceholder || '#999'}
            value={medalName}
            onChangeText={setMedalName}
          />
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="Descrição (opcional)"
            placeholderTextColor={theme.colors.textPlaceholder || '#999'}
            value={descricao}
            onChangeText={setDescricao}
            multiline
          />
        </View>

        {/* Seleção de Turma */}
        <Text style={styles.subtitle}>1. Selecione a Turma:</Text>
        <FlatList
          horizontal
          data={turmas}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.selectionButton, selectedTurma === item && styles.selectedButton]}
              onPress={() => handleSelectTurma(item)}
            >
              <Text style={[styles.selectionButtonText, selectedTurma === item && styles.selectedButtonText]}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalList}
        />

        {/* Seleção de Aluno */}
        {selectedTurma && (
          <>
            <Text style={styles.subtitle}>2. Selecione o Aluno da Turma {selectedTurma}:</Text>
            <FlatList
              horizontal
              data={alunosPorTurma[selectedTurma]}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.selectionButton, selectedAluno === item.nome && styles.selectedButton]}
                  onPress={() => handleSelectAluno(item.nome)}
                >
                  <Text style={[styles.selectionButtonText, selectedAluno === item.nome && styles.selectedButtonText]}>{item.nome}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalList}
            />
          </>
        )}

        {/* Botão de Atribuir */}
        {selectedAluno && medalName ? (
          <TouchableOpacity style={styles.assignButton} onPress={handleAssignMedal}>
            <Text style={styles.assignButtonText}>Atribuir a {selectedAluno}</Text>
          </TouchableOpacity>
        ) : null}

        {/* Histórico de Medalhas Atribuídas */}
        <View style={styles.historicoContainer}>
          <Text style={styles.formTitle}>Histórico de Medalhas</Text>
          {assignedMedals.length > 0 ? (
            assignedMedals.map(medal => (
              <View key={medal.id} style={styles.historicoItem}>
                <Text style={styles.historicoText}>🏅 {medal.medalha} - {medal.aluno} ({medal.turma})</Text>
                {medal.descricao ? <Text style={styles.historicoDescricao}>"{medal.descricao}"</Text> : null}
                <Text style={styles.historicoDescricao}>Data: {medal.data}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noHistorico}>Nenhuma medalha atribuída ainda.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    paddingTop: 35, // Aumentado para descer o ícone
    paddingBottom: 5,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    color: theme.colors.textPrimary,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
  },
  input: {
    backgroundColor: theme.colors.inputBackground,
    width: '100%',
    minHeight: 45,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    color: theme.colors.textPrimary, // Alterado para garantir que o texto digitado seja visível no tema escuro
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  subtitle: {
    fontSize: 18,
    color: theme.colors.textPrimary,
    marginBottom: 10,
    marginTop: 20,
  },
  horizontalList: {
    marginBottom: 20,
  },
  selectionButton: {
    backgroundColor: theme.colors.accentPrimary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 5,
  },
  selectedButton: {
    backgroundColor: theme.colors.accentSecondary,
  },
  selectionButtonText: {
    fontSize: 16,
    color: theme.colors.textOnAccentPrimary || theme.colors.buttonPrimaryText,
    fontWeight: 'bold',
  },
  selectedButtonText: {
    color: theme.colors.textOnAccentSecondary || theme.colors.buttonSecondaryText,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: 15,
  },
  assignButton: {
    backgroundColor: theme.colors.buttonPrimaryBackground,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 30,
  },
  assignButtonText: {
    fontSize: 18,
    color: theme.colors.buttonPrimaryText,
    fontWeight: 'bold',
  },
  historicoContainer: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
  },
  historicoItem: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderSecondary,
  },
  historicoText: {
    fontSize: 16,
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  historicoDescricao: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  noHistorico: {
    fontSize: 16,
    color: theme.colors.textDisabled || theme.colors.textSecondary,
    textAlign: 'center',
  },
});