import { useRouter } from 'expo-router';
import React, { useState } from 'react'; // Importação explícita do React
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LayoutPadrao from '../../components/LayoutPadrao';
import { useTheme } from '../../context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Adicionar importação

// Defina estilos base que não mudam com o tema
const baseStyles = StyleSheet.create({
  title: {
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
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  resumoNotificacoes: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  resumoNumero: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  resumoLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  recentesTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  scroll: {
    flex: 1,
  },
  boxCinza: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  cardGrande: {
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
    flexShrink: 1, // Garante que o texto não empurre o ícone para fora
  },
  cardDescricao: {
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderRadius: 16,
    padding: 20,
    width: '80%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 8,
  },
  modalCloseButton: {
    marginTop: 16,
    alignSelf: 'center',
    paddingVertical: 10, // Ajustado para consistência
    paddingHorizontal: 20, // Ajustado para consistência
    borderRadius: 8,
  },
  modalCloseText: {
    fontWeight: 'bold',
  },
});

export default function HomeScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [notificacoes, setNotificacoes] = useState({
    1: true, 2: true, 3: true, 4: true, 5: true, 6: true,
  });
  const [modalVisible, setModalVisible] = useState(false);

  const alternarNotificacao = (id) => {
    setNotificacoes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleMissionClick = (id) => {
    console.log(`Missão clicada: ${id}`);
    // Adicionar aqui a navegação 
  };

  const handleNotificationClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <LayoutPadrao>
      <Text style={[baseStyles.title, { color: theme.colors.accentPrimary }]}>
        Painel de Controle
      </Text>

      {/* Resumo */}
      <View style={baseStyles.resumoContainer}>
        <TouchableOpacity
          style={[baseStyles.resumoBox, { backgroundColor: theme.colors.backgroundSecondary }]}
          onPress={() => router.push('/(tabs)/central')}
        >
          <Text style={[baseStyles.resumoNumero, { color: theme.colors.accentPrimary }]}>8</Text>
          <Text style={[baseStyles.resumoLabel, { color: theme.colors.textPrimary }]}>Missões Concluídas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[baseStyles.resumoBox, { backgroundColor: theme.colors.backgroundSecondary }]}
          onPress={() => router.push('/(tabs)/central')}
        >
          <Text style={[baseStyles.resumoNumero, { color: theme.colors.accentPrimary }]}>3</Text>
          <Text style={[baseStyles.resumoLabel, { color: theme.colors.textPrimary }]}>Missões em Andamento</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[baseStyles.resumoNotificacoes, { backgroundColor: theme.colors.accentSecondary }]}
          onPress={handleNotificationClick}
        >
          <Text style={[baseStyles.resumoNumero, { color: theme.colors.buttonSecondaryText }]}>5</Text>
          <Text style={[baseStyles.resumoLabel, { color: theme.colors.buttonSecondaryText }]}>Notificações</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[baseStyles.resumoBox, { backgroundColor: theme.colors.backgroundSecondary }]}
          onPress={() => router.push('/(tabs)/medalhas')}
        >
          <Text style={[baseStyles.resumoNumero, { color: theme.colors.accentPrimary }]}>12</Text>
          <Text style={[baseStyles.resumoLabel, { color: theme.colors.textPrimary }]}>Medalhas</Text>
        </TouchableOpacity>
      </View>

      {/* Atividades Recentes */}
      <Text style={[baseStyles.recentesTitulo, { color: theme.colors.accentPrimary }]}>
        Atividades Recentes
      </Text>
      <ScrollView style={baseStyles.scroll} showsVerticalScrollIndicator={false}>
        <View style={[baseStyles.boxCinza, { backgroundColor: theme.colors.backgroundSecondary }]}>
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <TouchableOpacity
              key={id}
              style={[baseStyles.cardGrande, { backgroundColor: theme.colors.backgroundPrimary }]}
              onPress={() => handleMissionClick(id)}
            >
              <View style={baseStyles.cardHeader}>
                <Text style={[baseStyles.cardTitulo, { color: theme.colors.textPrimary }]}>
                  {`Missão: ${
                    id % 2 === 0
                      ? 'Ambiente Espacial'
                      : id % 3 === 0
                      ? 'Componentes e Aplicações'
                      : 'Metodologia Científica'
                  }`}
                </Text>
                <TouchableOpacity onPress={() => alternarNotificacao(id)}>
                  <MaterialCommunityIcons
                    name={notificacoes[id] ? 'bell' : 'bell-off-outline'}
                    size={24}
                    color={theme.colors.textPrimary}
                  />
                </TouchableOpacity>
              </View>
              <Text style={[baseStyles.cardDescricao, { color: theme.colors.textSecondary }]}>
                {`Atividade: ${
                  id % 2 === 0
                    ? 'Explorando Riscos'
                    : id % 3 === 0
                    ? 'Classificação de Componentes'
                    : 'Icebreaker'
                }`}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Modal de Notificações */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={baseStyles.modalContainer}>
          <View style={[baseStyles.modalContent, { backgroundColor: theme.colors.backgroundSecondary }]}>
            <Text style={[baseStyles.modalTitle, { color: theme.colors.textPrimary }]}>
              Notificações
            </Text>
            <ScrollView>
              {[1, 2, 3, 4, 5].map((id) => (
                <Text key={id} style={[baseStyles.modalText, { color: theme.colors.textSecondary }]}>
                  {`Notificação ${id}: Detalhes da notificação.`}
                </Text>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={[baseStyles.modalCloseButton, { backgroundColor: theme.colors.accentSecondary }]}
              onPress={handleCloseModal}
            >
              <Text style={[baseStyles.modalCloseText, { color: theme.colors.buttonSecondaryText }]}>
                Fechar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LayoutPadrao>
  );
}
