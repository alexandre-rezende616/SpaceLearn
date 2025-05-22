// app/(tabs)/central.js

import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LayoutPadrao from '../../components/LayoutPadrao';
import { useTheme } from '../../context/ThemeContext'; // Importe o hook useTheme

// Defina estilos base que não mudam com o tema
const baseStyles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tabBar: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 10,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeTab: {
    borderRadius: 10, // Mantém o borderRadius para a aba ativa
  },
  content: {
    flex: 1,
  },
  card: { // Card de Aula
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
  },
  exploreButton: { // Botão Explore
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'center',
  },
  exploreText: {
    fontWeight: 'bold',
  },
  roteiroCard: { // Card de Roteiro
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  roteiroTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  roteiroText: {
    fontSize: 14,
    marginBottom: 12,
  },
  pdfButton: { // Botão Abrir PDF
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 8,
  },
  pdfText: {
    fontWeight: 'bold',
  },
  markDone: { // Texto Marcar como concluído
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default function CentralScreen() {
  const [abaAtiva, setAbaAtiva] = useState('aulas');
  const { theme } = useTheme(); // Use o hook para acessar o tema

  // Dados dos roteiros como um array de objetos
  const roteirosData = [
    {
      id: 'roteiro1',
      titulo: 'Hello, World !',
      texto: 'Escreva um script para exibir "Hello, World!" na tela. Siga os passos abaixo para criar o programa:',
    },
    {
      id: 'roteiro2',
      titulo: 'o seu nome',
      texto: 'Escreva um script simples para exibir o seu nome na tela. Esse é um ótimo primeiro passo para aprender como funcionam os comandos de saída (output) em programação.',
    },
  ];

  return (
    <LayoutPadrao>
      <Text style={[baseStyles.title, { color: theme.colors.accentPrimary }]}>Central de Missões</Text>

      <View style={[baseStyles.tabBar, { backgroundColor: theme.colors.backgroundSecondary }]}>
        <TouchableOpacity
          style={[
            baseStyles.tabButton,
            abaAtiva === 'aulas' && [baseStyles.activeTab, { backgroundColor: theme.colors.accentPrimary }] // Cor de fundo da aba ativa
          ]}
          onPress={() => setAbaAtiva('aulas')}
        >
          <Text style={[
            baseStyles.tabText,
            { color: abaAtiva === 'aulas' ? theme.colors.buttonPrimaryText : theme.colors.textPrimary } // Cor do texto da aba (ativo vs inativo)
          ]}>Aulas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            baseStyles.tabButton,
            abaAtiva === 'roteiros' && [baseStyles.activeTab, { backgroundColor: theme.colors.accentPrimary }] // Cor de fundo da aba ativa
          ]}
          onPress={() => setAbaAtiva('roteiros')}
        >
          <Text style={[
            baseStyles.tabText,
            { color: abaAtiva === 'roteiros' ? theme.colors.buttonPrimaryText : theme.colors.textPrimary } // Cor do texto da aba (ativo vs inativo)
          ]}>Roteiros de Aula</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={baseStyles.content}>
        {abaAtiva === 'aulas' ? (
          <>
            <View style={[baseStyles.card, { backgroundColor: theme.colors.backgroundSecondary }]}>
              <Image source={require('../../../assets/images/aula1.png')} style={baseStyles.cardImage} />
              <View style={baseStyles.cardContent}>
                <Text style={[baseStyles.cardTitle, { color: theme.colors.textPrimary }]}>metodologia científica aplicada a projetos</Text>
                <TouchableOpacity style={[baseStyles.exploreButton, { backgroundColor: theme.colors.accentSecondary }]}>
                  <Text style={[baseStyles.exploreText, { color: theme.colors.buttonSecondaryText }]}>Explore</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[baseStyles.card, { backgroundColor: theme.colors.backgroundSecondary }]}>
              <Image source={require('../../../assets/images/aula2.png')} style={baseStyles.cardImage} />
              <View style={baseStyles.cardContent}>
                <Text style={[baseStyles.cardTitle, { color: theme.colors.textPrimary }]}>ambiente espacial e seus riscos</Text>
                <TouchableOpacity style={[baseStyles.exploreButton, { backgroundColor: theme.colors.accentSecondary }]}>
                  <Text style={[baseStyles.exploreText, { color: theme.colors.buttonSecondaryText }]}>Explore</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[baseStyles.card, { backgroundColor: theme.colors.backgroundSecondary }]}>
              <Image source={require('../../../assets/images/aula3.png')} style={baseStyles.cardImage} />
              <View style={baseStyles.cardContent}>
                <Text style={[baseStyles.cardTitle, { color: theme.colors.textPrimary }]}>componentes e aplicações</Text>
                <TouchableOpacity style={[baseStyles.exploreButton, { backgroundColor: theme.colors.accentSecondary }]}>
                  <Text style={[baseStyles.exploreText, { color: theme.colors.buttonSecondaryText }]}>Explore</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <>
            {roteirosData.map((roteiro) => (
              <View 
                key={roteiro.id} 
                style={[baseStyles.roteiroCard, { backgroundColor: theme.colors.backgroundSecondary }]}
              >
                <Text style={[baseStyles.roteiroTitle, { color: theme.colors.textPrimary }]}>{roteiro.titulo}</Text>
                <Text style={[baseStyles.roteiroText, { color: theme.colors.textSecondary }]}>
                  {roteiro.texto}
                </Text>
                <TouchableOpacity style={[baseStyles.pdfButton, { backgroundColor: theme.colors.buttonPrimaryBackground }]}>
                  <Text style={[baseStyles.pdfText, { color: theme.colors.buttonPrimaryText }]}>Abrir PDF</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log(`Marcar roteiro '${roteiro.titulo}' como concluído`)}>
                  <Text style={[baseStyles.markDone, { color: theme.colors.accentSecondary }]}>Marcar como concluído</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </LayoutPadrao>
  );
}