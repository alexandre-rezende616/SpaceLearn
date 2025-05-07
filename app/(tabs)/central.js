// app/(tabs)/central.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import LayoutPadrao from '../../src/components/LayoutPadrao';

export default function CentralScreen() {
  const [abaAtiva, setAbaAtiva] = useState('aulas');

  return (
    <LayoutPadrao>
      <Text style={styles.title}>Central de Missões</Text>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, abaAtiva === 'aulas' && styles.activeTab]}
          onPress={() => setAbaAtiva('aulas')}
        >
          <Text style={[styles.tabText, abaAtiva === 'aulas' && styles.activeTabText]}>Aulas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, abaAtiva === 'roteiros' && styles.activeTab]}
          onPress={() => setAbaAtiva('roteiros')}
        >
          <Text style={[styles.tabText, abaAtiva === 'roteiros' && styles.activeTabText]}>Roteiros de Aula</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {abaAtiva === 'aulas' ? (
          <>
            <View style={styles.card}>
              <Image source={require('../../assets/images/aula1.png')} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>metodologia científica aplicada a projetos</Text>
                <TouchableOpacity style={styles.exploreButton}>
                  <Text style={styles.exploreText}>Explore</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.card}>
              <Image source={require('../../assets/images/aula2.png')} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>ambiente espacial e seus riscos</Text>
                <TouchableOpacity style={styles.exploreButton}>
                  <Text style={styles.exploreText}>Explore</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.card}>
              <Image source={require('../../assets/images/aula3.png')} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>componentes e aplicações</Text>
                <TouchableOpacity style={styles.exploreButton}>
                  <Text style={styles.exploreText}>Explore</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.roteiroCard}>
              <Text style={styles.roteiroTitle}>Hello, World !</Text>
              <Text style={styles.roteiroText}>
                Escreva um script para exibir "Hello, World!" na tela. Siga os passos abaixo para criar o programa:
              </Text>
              <TouchableOpacity style={styles.pdfButton}>
                <Text style={styles.pdfText}>Abrir PDF</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.markDone}>Marcar como concluído</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.roteiroCard}>
              <Text style={styles.roteiroTitle}>o seu nome</Text>
              <Text style={styles.roteiroText}>
                Escreva um script simples para exibir o seu nome na tela. Esse é um ótimo primeiro passo para aprender como funcionam os comandos de saída (output) em programação.
              </Text>
              <TouchableOpacity style={styles.pdfButton}>
                <Text style={styles.pdfText}>Abrir PDF</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={styles.markDone}>Marcar como concluído</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </LayoutPadrao>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F2F2F7', // Ghost White
    marginBottom: 16,
  },
  tabBar: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: '#1D1856', // Midnight Blue
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: {
    color: '#F2F2F7', // Ghost White
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeTab: {
    backgroundColor: '#00CFE5', // Sky Blue Crayola
    borderRadius: 10,
  },
  activeTabText: {
    color: '#0C0931', // Oxford Blue
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: '#F2F2F7', // Ghost White
    borderRadius: 12,
    marginBottom: 16,
    padding: 10,
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 12,
  },
  cardContent: {
    alignItems: 'center',
    width: '100%',
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
    textTransform: 'capitalize',
    textAlign: 'center',
    color: '#0C0931', // Oxford Blue
  },
  exploreButton: {
    backgroundColor: '#E80074', // Red Purple
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'center',
  },
  exploreText: {
    color: '#F2F2F7', // Ghost White
    fontWeight: 'bold',
  },
  roteiroCard: {
    backgroundColor: '#F2F2F7', // Ghost White
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  roteiroTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'capitalize',
    color: '#0C0931', // Oxford Blue
  },
  roteiroText: {
    fontSize: 14,
    marginBottom: 12,
    color: '#0C0931', // Oxford Blue
  },
  pdfButton: {
    backgroundColor: '#00CFE5', // Sky Blue Crayola
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 8,
  },
  pdfText: {
    color: '#0C0931', // Oxford Blue
    fontWeight: 'bold',
  },
  markDone: {
    color: '#E80074', // Red Purple
    textAlign: 'center',
    fontWeight: 'bold',
  },
});