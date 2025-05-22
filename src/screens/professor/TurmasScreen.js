import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import ProfessorAccountIcon from '@/components/ProfessorAccountIcon'; // Importar o ícone
import { useTheme } from '../../context/ThemeContext'; // Importe o hook useTheme

// Defina estilos base que não mudam com o tema
const baseStyles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    paddingTop: 35, // Ajustado para descer o ícone
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

const turmasData = {
  'Metodologia Científica Aplicada a Projetos': [
    {
      nome: 'Turma Orion',
      alunos: 18,
      ultimaAtividade: 'Método Científico - 08/05',
    },
    {
      nome: 'Turma Apollo',
      alunos: 22,
      ultimaAtividade: 'Hipóteses e Problemas - 09/05',
    },
  ],
  'Ambiente Espacial e seus Riscos': [
    {
      nome: 'Turma Nebula',
      alunos: 20,
      ultimaAtividade: 'Radiação Cósmica - 10/05',
    },
  ],
  'Componentes e Aplicações': [
    {
      nome: 'Turma Galileu',
      alunos: 25,
      ultimaAtividade: 'Painéis Solares - 07/05',
    },
  ],
};

export default function TurmasScreen() {
  const router = useRouter();
  const { theme } = useTheme(); // Use o hook para acessar o tema

  return (
    <View style={[baseStyles.screenWrapper, { backgroundColor: theme.colors.backgroundPrimary }]}>
      <View style={[baseStyles.headerBar, { backgroundColor: theme.colors.backgroundPrimary }]}> 
        {/* O ProfessorAccountIcon pode precisar de props para o tema se seus ícones internos tiverem cores */}
        <ProfessorAccountIcon />
      </View>
      <ScrollView contentContainerStyle={baseStyles.scrollContainer}>
        {Object.entries(turmasData).map(([materia, turmas], index) => (
          <View key={index} style={baseStyles.materiaContainer}>
            <Text style={[baseStyles.materiaTitulo, { color: theme.colors.accentPrimary }]}>{materia}</Text>
            {turmas.map((turma, idx) => (
              <View 
                key={idx} 
                style={[
                  baseStyles.card, 
                  { 
                    backgroundColor: theme.colors.backgroundSecondary,
                    shadowColor: theme.isDark ? '#000' : '#A9A9A9',
                  }
                ]}
              >
                <Text style={[baseStyles.nomeTurma, { color: theme.colors.textPrimary }]}>{turma.nome}</Text>
                <Text style={[baseStyles.info, { color: theme.colors.textSecondary }]}>👥 Alunos: {turma.alunos}</Text>
                <Text style={[baseStyles.info, { color: theme.colors.textSecondary }]}>📌 Última atividade: {turma.ultimaAtividade}</Text>
                <View style={baseStyles.botoes}>
                  <TouchableOpacity
                    style={[baseStyles.botao, { backgroundColor: theme.colors.buttonPrimaryBackground }]}
                    onPress={() => {
                      const nomeDaTurmaParaRota = turma.nome.replace('Turma ', '');
                      // Navega para a rota dinâmica, passando o nome da turma diretamente na URL
                      router.push(`/(stack-only)/turma/${encodeURIComponent(nomeDaTurmaParaRota)}/alunos`);
                    }}
                 >
                    <Text style={[baseStyles.botaoTexto, { color: theme.colors.buttonPrimaryText }]}>Ver Alunos</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[baseStyles.botao, { backgroundColor: theme.colors.buttonPrimaryBackground }]}
                    onPress={() => {
                      // Lógica para publicar aula para a turma
                      console.log('Publicar aula para:', turma.nome);
                    }}
                  >
                    <Text style={[baseStyles.botaoTexto, { color: theme.colors.buttonPrimaryText }]}>Publicar Aula</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[baseStyles.botao, { backgroundColor: theme.colors.accentSecondary }]}
                    onPress={() => console.log('Ver progresso para:', turma.nome)} // Adicionado onPress
                  >
                    <Text style={[baseStyles.botaoTexto, { color: theme.colors.buttonSecondaryText }]}>Ver Progresso</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
