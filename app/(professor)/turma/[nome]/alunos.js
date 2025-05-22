import alunosPorTurma from '@/data/alunosPorTurma'; // Verifique se este alias @/ está configurado ou ajuste o caminho relativo
import { useLocalSearchParams } from 'expo-router';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

export default function AlunosDaTurmaScreen() {
  const { nome } = useLocalSearchParams();

  // Decodifica o nome da turma recebido como parâmetro. Este será a chave para buscar os alunos.
  // Ex: se nome é "Orion", nomeDaTurmaChave será "Orion".
  const nomeDaTurmaChave = decodeURIComponent(nome);

  // Busca a lista de alunos usando a chave correta.
  const alunos = alunosPorTurma[nomeDaTurmaChave] || [];

  // Cria o nome completo da turma para ser exibido no título.
  const nomeCompletoParaExibicao = `Turma ${nomeDaTurmaChave}`;

  // console.log('Nome recebido:', nome); // ✅ Debug
  // console.log('Nome completo para exibição:', nomeCompletoParaExibicao); // ✅ Debug
  // console.log('Alunos:', alunos); // ✅ Debug

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Alunos da {nomeCompletoParaExibicao} ({alunos.length})</Text>
      <FlatList
        data={alunos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={require('@/../assets/images/avatarr.png')} style={styles.avatar} /> {/* Verifique este caminho também */}
            <View style={styles.info}>
              <Text style={styles.nome}>{item.nome} {item.sobrenome}</Text>
              <Text style={styles.texto}>Progresso: {item.progresso}</Text>
              <Text style={styles.texto}>Atividades concluídas: {item.atividadesConcluidas}</Text>
              <Text style={styles.texto}>
                Presença: {item.presente ? '✅ Presente' : '❌ Ausente'}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1856',
    padding: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00CFE5',
    marginBottom: 16,
  },
  lista: {
    paddingBottom: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F2F2F7',
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
    color: '#0C0931',
    marginBottom: 4,
  },
  texto: {
    color: '#0C0931',
    fontSize: 14,
  },
});