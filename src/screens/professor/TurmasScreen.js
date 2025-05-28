import ProfessorAccountIcon from '@/components/ProfessorAccountIcon'; // Importar o ícone
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Importar ícones
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useState } from 'react'; // Importar React e hooks
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext'; // Importe o hook useTheme
import { fetchMaterias } from '../../services/materiaService'; // Importar serviço de matérias
import { fetchTurmas } from '../../services/turmaService'; // Importar serviço de turmas

// Defina estilos base que não mudam com o tema
const baseStyles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Alterado para space-between
    paddingHorizontal: 15,
    alignItems: 'center', // Adicionado para alinhar itens verticalmente
    paddingTop: 35, // Ajustado para descer o ícone
    paddingBottom: 5,
  },
  headerActions: { // Container para os botões do header
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  scrollContainer: {
    padding: 15,
    paddingTop: 10, // Ajustado para o conteúdo abaixo da headerBar
    flexGrow: 1,
  },
  materiaContainer: {
    marginBottom: 25,
  },
  materiaTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  nomeTurma: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    marginBottom: 3,
  },
  botoes: {
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
    gap: 10,
  },
  botao: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 30,
    // marginRight: 10, // Removido, usando gap no container 'botoes'
  },
  botaoTexto: {
    fontWeight: 'bold',
  },
});

export default function TurmasScreen() {
  const router = useRouter();
  const { theme } = useTheme(); // Use o hook para acessar o tema
  const [materias, setMaterias] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [groupedTurmas, setGroupedTurmas] = useState({});

  const carregarDados = async () => {
    setLoading(true);
    try {
      const materiasData = await fetchMaterias();
      const turmasData = await fetchTurmas();
      setMaterias(materiasData);
      setTurmas(turmasData);

      // Agrupar turmas por matéria
      const grouped = materiasData.reduce((acc, materia) => {
        acc[materia.id] = {
          nomeMateria: materia.nome,
          turmas: turmasData.filter(turma => turma.materiaId === materia.id)
        };
        return acc;
      }, {});
      setGroupedTurmas(grouped);

    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os dados de turmas e matérias.");
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      carregarDados();
    }, [])
  );

  if (loading) {
    return (
      <View style={[baseStyles.screenWrapper, { backgroundColor: theme.colors.backgroundPrimary, justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={theme.colors.accentPrimary} />
      </View>
    );
  }

  return (
    <View style={[baseStyles.screenWrapper, { backgroundColor: theme.colors.backgroundPrimary }]}>
      <View style={[baseStyles.headerBar, { backgroundColor: theme.colors.backgroundPrimary }]}> 
        <View style={baseStyles.headerActions}>
          <TouchableOpacity onPress={() => router.push('/(stack-only)/professor/materia/gerenciar')} style={{ marginRight: 15 }}>
            <MaterialCommunityIcons name="book-cog-outline" size={30} color={theme.colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(stack-only)/professor/turma/nova')}>
            <MaterialCommunityIcons name="plus-circle-outline" size={30} color={theme.colors.textPrimary} />
            {/* <Text style={{ color: theme.colors.textPrimary, marginLeft: 5 }}>Nova Turma</Text> */}
          </TouchableOpacity>
        </View>
        <Text style={{fontSize: 22, fontWeight: 'bold', color: theme.colors.accentPrimary}}>Turmas</Text>
        <ProfessorAccountIcon /> 
        {/* O ProfessorAccountIcon pode precisar de props para o tema */}
      </View>
      <ScrollView contentContainerStyle={baseStyles.scrollContainer}>
        {Object.values(groupedTurmas).map((grupo, index) => {
          if (grupo.turmas.length > 0) { // Só mostra a matéria se tiver turmas
            return (
              <View key={grupo.nomeMateria + index} style={baseStyles.materiaContainer}>
                <Text style={[baseStyles.materiaTitulo, { color: theme.colors.accentPrimary }]}>{grupo.nomeMateria}</Text>
                {grupo.turmas.map((turma) => ( // Removido idx, usando turma.id como key
                  <View 
                    key={turma.id}
                    style={[
                      baseStyles.card, 
                      { 
                        backgroundColor: theme.colors.backgroundSecondary,
                        shadowColor: theme.isDark ? '#000' : '#A9A9A9',
                      }
                    ]}
                  >
                    <Text style={[baseStyles.nomeTurma, { color: theme.colors.textPrimary }]}>{turma.nome || 'Nome da Turma Indefinido'}</Text>
                    <Text style={[baseStyles.info, { color: theme.colors.textSecondary }]}>👥 Alunos: {turma.alunos}</Text>
                    <Text style={[baseStyles.info, { color: theme.colors.textSecondary }]}>📌 Última atividade: {turma.ultimaAtividade}</Text>
                    <View style={baseStyles.botoes}>
                      <TouchableOpacity
                        style={[baseStyles.botao, { backgroundColor: theme.colors.buttonPrimaryBackground }]}
                        onPress={() => {
                          const nomeDaTurmaParaRota = turma.nome ? turma.nome.replace('Turma ', '') : '';
                          router.push(`/(stack-only)/turma/${encodeURIComponent(nomeDaTurmaParaRota)}/alunos`);
                        }}
                      >
                        <Text style={[baseStyles.botaoTexto, { color: theme.colors.buttonPrimaryText }]}>Ver Alunos</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={[baseStyles.botao, { backgroundColor: theme.colors.buttonPrimaryBackground }]}
                        onPress={() => {
                          const nomeDaTurmaParaRota = turma.nome ? turma.nome.replace('Turma ', '') : '';
                          router.push(`/(stack-only)/turma/${encodeURIComponent(nomeDaTurmaParaRota)}/nova-aula`);
                        }}
                      >
                        <Text style={[baseStyles.botaoTexto, { color: theme.colors.buttonPrimaryText }]}>Publicar Aula</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[baseStyles.botao, { backgroundColor: theme.colors.buttonPrimaryBackground }]}
                        onPress={() => {
                          const nomeDaTurmaParaRota = turma.nome ? turma.nome.replace('Turma ', '') : '';
                          router.push(`/(stack-only)/turma/${encodeURIComponent(nomeDaTurmaParaRota)}/lista-aulas`);
                        }}
                      >
                        <Text style={[baseStyles.botaoTexto, { color: theme.colors.buttonPrimaryText }]}>Ver Aulas</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={[baseStyles.botao, { backgroundColor: theme.colors.accentSecondary }]}
                        onPress={() => console.log('Ver progresso para:', turma.nome)}
                      >
                        <Text style={[baseStyles.botaoTexto, { color: theme.colors.buttonSecondaryText }]}>Ver Progresso</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            );
          }
          return null; // Retorna null explicitamente se não houver turmas para o grupo
        })}
      </ScrollView>
    </View>
  );
}
