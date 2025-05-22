// app/(professor)/medalhas.js
import React from 'react';
import { StyleSheet, View } from 'react-native';
import MedalhasScreen from '../../src/screens/professor/MedalhasScreen'; // Caminho para a tela de medalhas

export default function Medalhas() {
  return (
    <View style={styles.container}>
      <MedalhasScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1856', // Midnight Blue
  },
});
