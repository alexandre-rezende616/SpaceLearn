// app/(tabs)/home.js
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LayoutPadrao from '../../src/components/LayoutPadrao';

export default function HomeScreen() {
  const [notificacoes, setNotificacoes] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
  });

  const alternarNotificacao = (id) => {
    setNotificacoes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <LayoutPadrao style={styles.fundo}>
      <Text style={styles.title}>Painel de Controle</Text>

      {/* Resumo */}
      <View style={styles.resumoContainer}>
        <View style={styles.resumoBox}>
          <Text style={styles.resumoNumero}>8</Text>
          <Text style={styles.resumoLabel}>Missões Concluídas</Text>
        </View>
        <View style={styles.resumoBox}>
          <Text style={styles.resumoNumero}>3</Text>
          <Text style={styles.resumoLabel}>Em Andamento</Text>
        </View>
        <View style={styles.resumoNotificacoes}>
          <Text style={styles.resumoNumeroNotificacao}>5</Text>
          <Text style={styles.resumoLabelNotificacao}>Notificações</Text>
        </View>
        <View style={styles.resumoBox}>
          <Text style={styles.resumoNumero}>12</Text>
          <Text style={styles.resumoLabel}>Medalhas</Text>
        </View>
      </View>

      {/* Atividades Recentes */}
      <Text style={styles.recentesTitulo}>Atividades Recentes</Text>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.boxCinza}>
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <View key={id} style={styles.cardGrande}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitulo}>
                  Missão: {
                    id % 2 === 0
                      ? 'Ambiente Espacial'
                      : id % 3 === 0
                      ? 'Componentes e Aplicações'
                      : 'Metodologia Científica'
                  }
                </Text>
                <TouchableOpacity onPress={() => alternarNotificacao(id)}>
                  <Image
                    source={
                      notificacoes[id]
                        ? require('../../assets/images/bell.png')
                        : require('../../assets/images/bell-off.png')
                    }
                    style={styles.iconeSino}
                  />
                </TouchableOpacity>
              </View>
              <Text style={styles.cardDescricao}>
                Atividade: {
                  id % 2 === 0
                    ? 'Explorando Riscos'
                    : id % 3 === 0
                    ? 'Classificação de Componentes'
                    : 'Icebreaker'
                }
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </LayoutPadrao>
  );
}

const styles = StyleSheet.create({
  fundo: {
    backgroundColor: '#1D1856',
    flex: 1,
  },
  title: {
    color: '#F2F2F7',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  resumoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  resumoBox: {
    backgroundColor: '#F2F2F7',
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  resumoNotificacoes: {
    backgroundColor: '#E80074',
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  resumoNumero: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00CFE5',
    marginBottom: 6,
  },
  resumoNumeroNotificacao: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F2F2F7',
    marginBottom: 6,
  },
  resumoLabel: {
    fontSize: 14,
    color: '#0C0931',
    textAlign: 'center',
  },
  resumoLabelNotificacao: {
    fontSize: 14,
    color: '#F2F2F7',
    textAlign: 'center',
  },
  recentesTitulo: {
    color: '#F2F2F7',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  scroll: {
    flex: 1,
  },
  boxCinza: {
    backgroundColor: '#F2F2F7',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  cardGrande: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0C0931',
    flexShrink: 1,
  },
  cardDescricao: {
    fontSize: 14,
    color: '#555',
  },
  iconeSino: {
    width: 24,
    height: 24,
  },
});