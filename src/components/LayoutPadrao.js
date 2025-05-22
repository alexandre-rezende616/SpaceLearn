import React from 'react'; // Adicionado React para clareza, embora muitas vezes implícito
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';

// Defina estilos base que não mudam com o tema
const baseStyles = StyleSheet.create({
  container: {
    flex: 1, // O contêiner principal deve ocupar todo o espaço
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 35, // Espaço para a barra de status do celular
    paddingHorizontal: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    // marginTop: 0, // marginTop: 0 é o padrão, pode ser omitido
  },
  content: {
    flex: 1,
    paddingHorizontal: 20, // Padding para o conteúdo principal
    // O paddingTop para o conteúdo pode ser adicionado aqui se necessário,
    // ou em cada tela individual que usa o LayoutPadrao.
    // Por exemplo: paddingTop: 10,
  },
});

export default function LayoutPadrao({ children }) {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <View style={[baseStyles.container, { backgroundColor: theme.colors.backgroundPrimary }]}>
      {/* Faixa superior - usa cores do tema */}
      <View style={[
        baseStyles.topBar,
        {
          backgroundColor: theme.colors.backgroundSecondary, // Fundo da top bar
          borderBottomColor: theme.colors.borderSecondary, // Cor da borda inferior
        }
      ]}>
        {/* Espaçador à esquerda, se necessário para alinhar o avatar à direita */}
        <View /> 
        
        <TouchableOpacity onPress={() => router.push('/conta')}>
          <Image
            source={require('../../assets/images/avatarr.png')} // Verifique se este caminho está correto
            style={baseStyles.avatar}
          />
        </TouchableOpacity>
      </View>

      {/* Conteúdo principal */}
      <View style={baseStyles.content}>
        {children}
      </View>
    </View>
  );
}