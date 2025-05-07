import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function MedalDetailScreen() {
  const { titulo, descricao, conquistada } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{titulo}</Text>
      <View
        style={[
          styles.medalIcon,
          { backgroundColor: conquistada === '1' ? '#00CFE5' : '#F2F2F7' },
        ]}
      >
        <Text style={styles.medalIconText}>
          {conquistada === '1' ? '🏅' : '🔒'}
        </Text>
      </View>
      <Text style={styles.description}>{descricao}</Text>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1856',
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#F2F2F7',
    marginBottom: 16,
    textAlign: 'center',
  },
  medalIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  medalIconText: {
    fontSize: 60,
  },
  description: {
    fontSize: 16,
    color: '#F2F2F7',
    textAlign: 'center',
    marginBottom: 40,
  },
  backButton: {
    backgroundColor: '#E80074',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});