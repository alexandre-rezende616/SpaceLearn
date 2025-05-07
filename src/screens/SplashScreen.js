// src/screens/SplashScreen.js

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/login');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/astronauta.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>SpaceLearn</Text>
      <Text style={styles.subtitle}>explore a criação de satélites</Text>

      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>vamos lá</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1856', // Midnight Blue
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: '90%',
    height: 300,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F2F2F7', // Ghost White
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#F2F2F7', // Ghost White
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#00CFE5', // Sky Blue Crayola
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  buttonText: {
    color: '#0C0931', // Oxford Blue
    fontSize: 18,
    textTransform: 'lowercase',
    fontWeight: 'bold',
  },
});