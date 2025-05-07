

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function CentralScreen() {
  const [abaAtiva, setAbaAtiva] = useState('aulas');

  return (
    <View style={styles.container}>
      {/* Topo com botão de menu e avatar de perfil */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => console.log('Menu')}>
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log('Perfil')}>
          <Image
            source={require('../../assets/images/avatarr.png')} // substitua pela imagem de avatar correta
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      {/* Título da página */}
      <Text style={styles.title}>Central de Missões</Text>

      {/* Abas de Aulas e Roteiros de Aula */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            abaAtiva === 'aulas' && styles.activeTab,
          ]}
          onPress={() => setAbaAtiva('aulas')}
        >
          <Text
            style={[
              styles.tabText,
              abaAtiva === 'aulas' && styles.activeTabText,
            ]}
          >
            Aulas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButton,
            abaAtiva === 'roteiros' && styles.activeTab,
          ]}
          onPress={() => setAbaAtiva('roteiros')}
        >
          <Text
            style={[
              styles.tabText,
              abaAtiva === 'roteiros' && styles.activeTabText,
            ]}
          >
            Roteiros de Aula
          </Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo da aba ativa */}
      <View style={styles.content}>
        {abaAtiva === 'aulas' ? (
          <Text style={styles.placeholder}>Conteúdo das Aulas</Text>
        ) : (
          <Text style={styles.placeholder}>Roteiros das aulas</Text>
        )}
      </View>

      {/* Barra de navegação inferior */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => console.log('Home')}>
          <Ionicons name="home" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Central')}>
          <Ionicons name="rocket" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Diário')}>
          <FontAwesome5 name="book" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Ranking')}>
          <Ionicons name="trophy" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001f4d',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 20,
    marginBottom: 16,
  },
  tabBar: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 10,
    backgroundColor: '#003366',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: {
    color: '#ccc',
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeTab: {
    backgroundColor: '#0055cc',
    borderRadius: 10,
  },
  activeTabText: {
    color: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    color: '#fff',
    fontSize: 16,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 14,
    backgroundColor: '#003366',
    borderTopWidth: 1,
    borderTopColor: '#0055cc',
  },
});