import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Keyboard,
} from 'react-native';
import LayoutPadrao from '../../components/LayoutPadrao';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const getStyles = (theme) => StyleSheet.create({
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.accentPrimary,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  inputContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  input: {
    backgroundColor: theme.colors.inputBackground,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: theme.colors.textPrimary,
    borderWidth: 1,
    borderColor: theme.colors.border,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: theme.colors.buttonPrimaryBackground,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 20,
  },
  saveButtonText: {
    color: theme.colors.buttonPrimaryText,
    fontSize: 18,
    fontWeight: 'bold',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  anotacaoCard: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  anotacaoTexto: {
    fontSize: 16,
    color: theme.colors.textPrimary,
  },
  anotacaoData: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 5,
    textAlign: 'right',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
});

export default function DiarioScreen() {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [novaAnotacao, setNovaAnotacao] = useState('');
  const [anotacoesSalvas, setAnotacoesSalvas] = useState([]);

  const handleSalvarAnotacao = () => {
    if (novaAnotacao.trim() === '') {
      Alert.alert('Atenção', 'Sua anotação não pode estar vazia.');
      return;
    }
    const anotacao = {
      id: Date.now().toString(),
      texto: novaAnotacao,
      data: new Date().toLocaleString(),
    };
    setAnotacoesSalvas([anotacao, ...anotacoesSalvas]);
    setNovaAnotacao('');
    Keyboard.dismiss(); // Fecha o teclado
    Alert.alert('Sucesso', 'Anotação salva no seu diário!');
  };

  return (
    <LayoutPadrao>
      <Text style={styles.headerTitle}>Meu Diário de Bordo</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escreva seus pensamentos, aprendizados, ideias..."
          placeholderTextColor={theme.colors.textPlaceholder || '#999'}
          value={novaAnotacao}
          onChangeText={setNovaAnotacao}
          multiline
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSalvarAnotacao}>
        <Text style={styles.saveButtonText}>Salvar Anotação</Text>
      </TouchableOpacity>

      <Text style={styles.listTitle}>Minhas Anotações</Text>
      {anotacoesSalvas.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>Você ainda não fez nenhuma anotação.</Text>
        </View>
      ) : (
        <FlatList
          data={anotacoesSalvas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.anotacaoCard}>
              <Text style={styles.anotacaoTexto}>{item.texto}</Text>
              <Text style={styles.anotacaoData}>{item.data}</Text>
            </View>
          )}
        />
      )}
    </LayoutPadrao>
  );
}