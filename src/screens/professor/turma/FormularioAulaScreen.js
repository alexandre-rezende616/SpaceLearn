import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import { criarAula } from '../../../services/aulaService';
import { fetchTurmas } from '../../../services/turmaService'; // Para buscar todas as turmas

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
    fontSize: 18,
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
  textArea: {
    minHeight: 150,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundPrimary,
  },
});

export default function FormularioAulaScreen() {
  const router = useRouter();
  const { nomeDaTurma } = useLocalSearchParams();
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [turmaId, setTurmaId] = useState(null);
  const [loadingTurmaInfo, setLoadingTurmaInfo] = useState(true);

  useEffect(() => {
    const carregarTurmaId = async () => {
      if (nomeDaTurma) {
        setLoadingTurmaInfo(true);
        try {
          const todasTurmas = await fetchTurmas();
          const nomeTurmaDecodificado = decodeURIComponent(nomeDaTurma);
          // O nomeDaTurma vindo da rota é "Orion", "Apollo", etc.
          // O turma.nome no mock é "Turma Orion", "Turma Apollo", etc.
          const turmaEncontrada = todasTurmas.find(
            (t) => t.nome === `Turma ${nomeTurmaDecodificado}`
          );

          if (turmaEncontrada) {
            setTurmaId(turmaEncontrada.id);
          } else {
            Alert.alert('Erro', `Turma "${nomeTurmaDecodificado}" não encontrada.`);
            router.back(); // Volta se a turma não for encontrada
          }
        } catch (error) {
          Alert.alert('Erro', 'Não foi possível carregar os dados da turma.');
          console.error("Erro ao buscar turmaId:", error);
          router.back();
        } finally {
          setLoadingTurmaInfo(false);
        }
      }
    };
    carregarTurmaId();
  }, [nomeDaTurma, router]);

  const handleSalvarAula = async () => {
    if (!titulo.trim() || !conteudo.trim()) {
      Alert.alert('Erro', 'Título e conteúdo da aula são obrigatórios.');
      return;
    }
    if (!turmaId) {
      Alert.alert('Erro', 'ID da turma não está definido. Aguarde ou tente novamente.');
      return;
    }
    const novaAulaData = { titulo, conteudo, turmaId };
    try {
      const aulaCriada = await criarAula(novaAulaData);
      Alert.alert('Sucesso', `Aula "${aulaCriada.titulo}" criada para a turma ${decodeURIComponent(nomeDaTurma)}!`);
      router.back();
    } catch (error) {
      Alert.alert('Erro', error.message || 'Não foi possível criar a aula.');
      console.error("Erro ao criar aula:", error);
    }
  };

  if (loadingTurmaInfo) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.accentPrimary} />
        <Text style={{ color: theme.colors.textSecondary, marginTop: 10 }}>Carregando informações da turma...</Text>
      </View>
      );
  }

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nova Aula para {decodeURIComponent(nomeDaTurma || '')}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.formLabel}>Título da Aula*</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o título da aula"
          placeholderTextColor={theme.colors.textSecondary}
          value={titulo}
          onChangeText={setTitulo}
        />
        <Text style={styles.formLabel}>Conteúdo*</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Digite o conteúdo da aula"
          placeholderTextColor={theme.colors.textSecondary}
          value={conteudo}
          onChangeText={setConteudo}
          multiline
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSalvarAula}>
          <Text style={styles.saveButtonText}>Salvar Aula</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}