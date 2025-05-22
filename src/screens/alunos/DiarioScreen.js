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
import LayoutPadrao from '../../components/LayoutPadrao';
import { useTheme } from '../../context/ThemeContext'; // Importe o hook useTheme

// Defina estilos base que não mudam com o tema
const baseStyles = StyleSheet.create({
  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  botaoAdicionar: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  textoBotao: {
    fontWeight: 'bold',
  },
  scroll: {
    flex: 1,
  },
  notaContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  tituloNota: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    borderBottomWidth: 1,
  },
  textoNota: {
    fontSize: 14,
    minHeight: 60, // Para permitir múltiplas linhas
    textAlignVertical: 'top', // Alinha o texto ao topo no Android para multiline
  },
  botaoExcluir: {
    marginTop: 12,
    alignSelf: 'flex-end',
  },
  textoExcluir: {
    fontWeight: 'bold',
  },
});

export default function DiarioScreen() {
  const [notas, setNotas] = useState([]);
  const { theme } = useTheme(); // Use o hook para acessar o tema

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
      <View style={baseStyles.topo}>
        <Text style={[baseStyles.titulo, { color: theme.colors.accentPrimary }]}>Minhas Anotações</Text>
        <TouchableOpacity 
          style={[baseStyles.botaoAdicionar, { backgroundColor: theme.colors.buttonPrimaryBackground }]} 
          onPress={adicionarNota}
        >
          <Text style={[baseStyles.textoBotao, { color: theme.colors.buttonPrimaryText }]}>+ Adicionar Nota</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={baseStyles.scroll}>
        {notas.map((nota) => (
          <View 
            key={nota.id} 
            style={[
              baseStyles.notaContainer, 
              { 
                backgroundColor: theme.colors.backgroundSecondary,
                shadowColor: theme.isDark ? '#000' : '#A9A9A9', // Sombra adaptável
              }
            ]}
          >
            <TextInput
              style={[
                baseStyles.tituloNota, 
                { 
                  color: theme.colors.textPrimary,
                  borderBottomColor: theme.colors.accentPrimary 
                }
              ]}
              placeholder="Título"
              placeholderTextColor={theme.colors.textSecondary} // Placeholder usa cor secundária
              value={nota.titulo}
              onChangeText={(texto) =>
                atualizarNota(nota.id, 'titulo', texto)
              }
            />
            <TextInput
              style={[
                baseStyles.textoNota,
                { color: theme.colors.textPrimary }
              ]}
              placeholder="Escreva sua anotação..."
              placeholderTextColor={theme.colors.textSecondary} // Placeholder usa cor secundária
              multiline
              value={nota.texto}
              onChangeText={(texto) =>
                atualizarNota(nota.id, 'texto', texto)
              }
            />
            <TouchableOpacity
              onPress={() => excluirNota(nota.id)}
              style={baseStyles.botaoExcluir}
            >
              <Text style={[baseStyles.textoExcluir, { color: theme.colors.accentSecondary }]}>Excluir</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </LayoutPadrao>
  );
}