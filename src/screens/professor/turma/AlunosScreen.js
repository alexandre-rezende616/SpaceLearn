import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import alunosPorTurma from '@/data/alunosPorTurma';
import { useTheme } from '../../../context/ThemeContext'; // Importe o hook useTheme

// Função para gerar os estilos  com base no tema
const getStyles = (theme) => StyleSheet.create({
  screenContainer: { // Novo container principal da tela
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  headerContainer: { // Container para o botão de voltar e o título
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 0, // O título já tem marginBottom
  },
  backButton: {
    paddingRight: 10, // Espaçamento entre o botão e o título
    paddingVertical: 5, // Aumenta a área de toque
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  lista: {
    paddingBottom: 16,
    paddingHorizontal: 16, // Adiciona padding horizontal para alinhar com o header
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
  const router = useRouter();
  const { nome } = useLocalSearchParams();

  //  a chave pra buscar os alunos.
  // tipo se nome for "Orion", nomeDaTurmaChave será "Orion".
  const nomeDaTurmaChave = decodeURIComponent(nome);

  // Busca a lista de alunos usando a chave correta.
  const alunos = alunosPorTurma[nomeDaTurmaChave] || [];

  // Cria o nome completo da turma para ser exibido no título.
  const nomeCompletoParaExibicao = `Turma ${nomeDaTurmaChave}`;
  const { theme } = useTheme(); //  hook para acessar o tema
  const styles = getStyles(theme); // Gera os estilos com o tema atual

  console.log('Nome recebido:', nome); // ✅ Debug
  console.log('Nome completo para exibição:', nomeCompletoParaExibicao); // ✅ Debug
  console.log('Alunos:', alunos); // ✅ Debug

  return (
    <View style={styles.screenContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.titulo, { color: theme.colors.accentPrimary, flex: 1 }]}>
          Alunos da {nomeCompletoParaExibicao} ({alunos.length})
        </Text>
      </View>
      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: theme.colors.backgroundSecondary }]}>
            <Image source={require('@/../assets/images/avatarr.png')} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={[styles.nome, { color: theme.colors.textPrimary }]}>{item.nome} {item.sobrenome}</Text>
              <Text style={[styles.texto, { color: theme.colors.textSecondary }]}>Progresso: {item.progresso}</Text>
              <Text style={[styles.texto, { color: theme.colors.textSecondary }]}>Atividades concluídas: {item.atividadesConcluidas}</Text>
              <Text style={[styles.texto, { color: theme.colors.textSecondary }]}>
                Faltas: {item.presente ? 0 : 1} {/* Mostra 0 faltas se presente, 1 se ausente (ajustar se tiver dados de faltas reais) */}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
