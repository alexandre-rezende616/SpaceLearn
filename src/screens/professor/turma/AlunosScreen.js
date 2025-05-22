import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import alunosPorTurma from '@/data/alunosPorTurma';
import { useTheme } from '../../../context/ThemeContext'; // Importe o hook useTheme

// Defina estilos base que não mudam com o tema
const baseStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  lista: {
    paddingBottom: 16,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  texto: {
    fontSize: 14,
  },
});

export default function AlunosDaTurmaScreen() {
  const { nome } = useLocalSearchParams();

  // Decodifica o nome da turma recebido como parâmetro. Este será a chave para buscar os alunos.
  // Ex: se nome é "Orion", nomeDaTurmaChave será "Orion".
  const nomeDaTurmaChave = decodeURIComponent(nome);

  // Busca a lista de alunos usando a chave correta.
  const alunos = alunosPorTurma[nomeDaTurmaChave] || [];

  // Cria o nome completo da turma para ser exibido no título.
  const nomeCompletoParaExibicao = `Turma ${nomeDaTurmaChave}`;
  const { theme } = useTheme(); // Use o hook para acessar o tema

  console.log('Nome recebido:', nome); // ✅ Debug
  console.log('Nome completo para exibição:', nomeCompletoParaExibicao); // ✅ Debug
  console.log('Alunos:', alunos); // ✅ Debug

  return (
    <View style={[baseStyles.container, { backgroundColor: theme.colors.backgroundPrimary }]}>
      <Text style={[baseStyles.titulo, { color: theme.colors.accentPrimary }]}>Alunos da {nomeCompletoParaExibicao} ({alunos.length})</Text>
      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={baseStyles.lista}
        renderItem={({ item }) => (
          <View style={[baseStyles.card, { backgroundColor: theme.colors.backgroundSecondary }]}>
            <Image source={require('@/../assets/images/avatarr.png')} style={baseStyles.avatar} />
            <View style={baseStyles.info}>
              <Text style={[baseStyles.nome, { color: theme.colors.textPrimary }]}>{item.nome} {item.sobrenome}</Text>
              <Text style={[baseStyles.texto, { color: theme.colors.textSecondary }]}>Progresso: {item.progresso}</Text>
              <Text style={[baseStyles.texto, { color: theme.colors.textSecondary }]}>Atividades concluídas: {item.atividadesConcluidas}</Text>
              <Text style={[baseStyles.texto, { color: theme.colors.textSecondary }]}>
                Faltas: {item.presente ? 0 : 1} {/* Mostra 0 faltas se presente, 1 se ausente (ajustar se tiver dados de faltas reais) */}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
