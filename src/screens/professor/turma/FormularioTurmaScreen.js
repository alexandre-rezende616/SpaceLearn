import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; // Para selecionar a matéria
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import materiasFromMock from '../../../data/materiasMock'; // Usar dados mocados
// import { criarTurma } from '../../../services/turmaService'; // Comentado, pois não vamos realmente criar

const getStyles = (theme) => StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 35, // Aumentado para descer o conteúdo do header
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
    borderColor: theme.colors.textSecondary,
    marginBottom: 10,
  },
  pickerContainer: {
    backgroundColor: theme.colors.inputBackground,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    marginBottom: 10,
    overflow: 'hidden', // Para o borderRadius funcionar no Android com Picker
  },
  picker: {
    color: theme.colors.textPrimary,
    height: 50, // Ajuste conforme necessário
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundPrimary,
  }
});

export default function FormularioTurmaScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [nome, setNome] = useState('');
  const [selectedMateriaId, setSelectedMateriaId] = useState('');
  const [materias, setMaterias] = useState([]);
  const [loadingMaterias, setLoadingMaterias] = useState(true);

  useEffect(() => {
    // Simular carregamento de matérias
    const carregarMateriasMocadas = async () => {
      setLoadingMaterias(true);
      await new Promise(resolve => setTimeout(resolve, 300)); // Simula atraso
      setMaterias(materiasFromMock);
      if (materiasFromMock.length > 0) {
        setSelectedMateriaId(materiasFromMock[0].id);
      } else {
        setSelectedMateriaId('');
      }
      setLoadingMaterias(false);
    };
    carregarMateriasMocadas();
  }, []);

  const handleSalvarTurma = async () => {
    if (!nome.trim() || !selectedMateriaId) {
      Alert.alert('Erro', 'Nome da turma e matéria são obrigatórios.');
      return;
    }

    const novaTurmaData = { nome, materiaId: selectedMateriaId };

    try {
      // const turmaCriada = await criarTurma(novaTurmaData); // Comentado
      console.log("Tentativa de criar turma (simulado):", novaTurmaData);
      Alert.alert('Sucesso (Simulado)', `Turma "${nome}" seria criada para a matéria selecionada!`);
      router.back(); // Volta para a tela anterior
    } catch (error) {
      Alert.alert('Erro (Simulado)', 'Não foi possível criar a turma.');
      console.error("Erro ao simular criação de turma:", error);
    }
  };

  if (loadingMaterias) {
    return <View style={styles.loadingContainer}><ActivityIndicator size="large" color={theme.colors.accentPrimary} /></View>;
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.replace('/(professor)/turmas')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nova Turma</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.formLabel}>Nome da Turma*</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Ex: Turma Alpha de Foguetes" placeholderTextColor={theme.colors.textSecondary} />

        <Text style={styles.formLabel}>Matéria*</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedMateriaId}
            onValueChange={(itemValue) => setSelectedMateriaId(itemValue)}
            style={styles.picker}
            dropdownIconColor={theme.colors.textPrimary} // Cor do ícone do dropdown
          >
            {/* Adicionar um item placeholder caso nenhuma matéria esteja selecionada ou disponível */}
            {materias.length === 0 && <Picker.Item label="Nenhuma matéria disponível" value="" color={theme.colors.textPlaceholder || '#999'} />}
            {materias.length > 0 && !selectedMateriaId && <Picker.Item label="Selecione uma matéria..." value="" color={theme.colors.textPlaceholder || '#999'} />}
            {materias.map(materia => (
              <Picker.Item key={materia.id} label={materia.nome} value={materia.id} color={theme.isDark ? '#000000' : theme.colors.textPrimary} />
            ))}
          </Picker>
        </View>

        {/* Outros campos como 'alunos' e 'ultimaAtividade' podem ser adicionados aqui ou definidos por padrão no service */}

        <TouchableOpacity style={styles.saveButton} onPress={handleSalvarTurma}>
          <Text style={styles.saveButtonText}>Salvar Turma</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
