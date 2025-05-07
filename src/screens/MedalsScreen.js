// src/screens/MedalsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';

const MEDALHAS = [
  {
    id: '1',
    titulo: 'Primeira Missão',
    descricao: 'Concluiu a primeira missão com sucesso.',
    conquistada: true,
  },
  {
    id: '2',
    titulo: 'Mestre dos Satélites',
    descricao: 'Montou 5 satélites corretamente.',
    conquistada: true,
  },
  {
    id: '3',
    titulo: 'Quizzical',
    descricao: 'Acertou todos os quizzes de um módulo.',
    conquistada: false,
  },
  {
    id: '4',
    titulo: 'Explorador Espacial',
    descricao: 'Explorou todos os módulos disponíveis.',
    conquistada: false,
  },
  {
    id: '5',
    titulo: 'Participativo',
    descricao: 'Interagiu nas atividades da galeria.',
    conquistada: true,
  },
];

export default function MedalsScreen() {
  const [filtro, setFiltro] = useState('todas');
  const router = useRouter();

  const medalhasFiltradas = MEDALHAS.filter((m) => {
    if (filtro === 'todas') return true;
    if (filtro === 'conquistadas') return m.conquistada;
    if (filtro === 'faltantes') return !m.conquistada;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Medalhas</Text>

      <View style={styles.filtros}>
        <TouchableOpacity
          style={[
            styles.filtroBotao,
            filtro === 'todas' && styles.filtroSelecionado,
          ]}
          onPress={() => setFiltro('todas')}
        >
          <Text style={styles.filtroTexto}>Todas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filtroBotao,
            filtro === 'conquistadas' && styles.filtroSelecionado,
          ]}
          onPress={() => setFiltro('conquistadas')}
        >
          <Text style={styles.filtroTexto}>Conquistadas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filtroBotao,
            filtro === 'faltantes' && styles.filtroSelecionado,
          ]}
          onPress={() => setFiltro('faltantes')}
        >
          <Text style={styles.filtroTexto}>Faltantes</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={medalhasFiltradas}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.medalha,
              {
                backgroundColor: item.conquistada ? '#00CFE5' : '#F2F2F7',
              },
            ]}
            onPress={() =>
              router.push({
                pathname: '/detalhes-medalha',
                params: {
                  titulo: item.titulo,
                  descricao: item.descricao,
                  conquistada: item.conquistada ? '1' : '0',
                },
              })
            }
          >
            <Text style={styles.medalhaTexto}>
              {item.conquistada ? '🏅' : '🔒'}
            </Text>
            <Text
              style={[
                styles.medalhaTitulo,
                { color: item.conquistada ? '#fff' : '#333' },
              ]}
            >
              {item.titulo}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1856',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    color: '#F2F2F7',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  filtros: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  filtroBotao: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#262159',
  },
  filtroSelecionado: {
    backgroundColor: '#E80074',
  },
  filtroTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  lista: {
    paddingBottom: 40,
  },
  medalha: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
  },
  medalhaTexto: {
    fontSize: 40,
    marginBottom: 8,
  },
  medalhaTitulo: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});