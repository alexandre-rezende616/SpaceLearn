import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function LayoutPadrao({ children }) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Faixa superior */}
      <View style={styles.topBar}>
        <View />
        <TouchableOpacity onPress={() => router.push('/conta')}>
          <Image
            source={require('../../assets/images/avatarr.png')}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      {/* Conteúdo principal */}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1D1856', // Midnight Blue
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F2F2F7', // Ghost White
    paddingTop: 1,
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#00CFE5', // Sky Blue Crayola
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});