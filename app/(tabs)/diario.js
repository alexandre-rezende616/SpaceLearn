// app/(tabs)/diario.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import LayoutPadrao from '../../src/components/LayoutPadrao';

export default function DiarioScreen() {
  const [notas, setNotas] = useState([]);

  const adicionarNota = () => {
    const novaNota = { id: Date.now(), titulo: '', texto: '' };
    setNotas([...notas, novaNota]);
  };

  const atualizarNota = (id, campo, valor) => {
    setNotas((prevNotas) =>
      prevNotas.map((nota) =>
        nota.id === id ? { ...nota, [campo]: valor } : nota
      )
    );
  };

  const excluirNota = (id) => {
    setNotas((prevNotas) => prevNotas.filter((nota) => nota.id !== id));
  };

  return (
    <LayoutPadrao>
      <View style={styles.topo}>
        <Text style={styles.titulo}>Minhas Anotações</Text>
        <TouchableOpacity style={styles.botaoAdicionar} onPress={adicionarNota}>
          <Text style={styles.textoBotao}>+ Adicionar Nota</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll}>
        {notas.map((nota) => (
          <View key={nota.id} style={styles.notaContainer}>
            <TextInput
              style={styles.tituloNota}
              placeholder="Título"
              placeholderTextColor="#888"
              value={nota.titulo}
              onChangeText={(texto) =>
                atualizarNota(nota.id, 'titulo', texto)
              }
            />
            <TextInput
              style={styles.textoNota}
              placeholder="Escreva sua anotação..."
              placeholderTextColor="#888"
              multiline
              value={nota.texto}
              onChangeText={(texto) =>
                atualizarNota(nota.id, 'texto', texto)
              }
            />
            <TouchableOpacity
              onPress={() => excluirNota(nota.id)}
              style={styles.botaoExcluir}
            >
              <Text style={styles.textoExcluir}>Excluir</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </LayoutPadrao>
  );
}

const styles = StyleSheet.create({
  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F2F2F7', // Ghost White
  },
  botaoAdicionar: {
    backgroundColor: '#00CFE5', // Sky Blue Crayola
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  textoBotao: {
    color: '#0C0931', // Oxford Blue
    fontWeight: 'bold',
  },
  scroll: {
    flex: 1,
  },
  notaContainer: {
    backgroundColor: '#F2F2F7', // Ghost White
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  tituloNota: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#0C0931', // Oxford Blue
    borderBottomWidth: 1,
    borderBottomColor: '#00CFE5', // Sky Blue Crayola
  },
  textoNota: {
    fontSize: 14,
    color: '#1D1856', // Midnight Blue
    minHeight: 60,
    textAlignVertical: 'top',
  },
  botaoExcluir: {
    marginTop: 12,
    alignSelf: 'flex-end',
  },
  textoExcluir: {
    color: '#E80074', // Red Purple
    fontWeight: 'bold',
  },
});