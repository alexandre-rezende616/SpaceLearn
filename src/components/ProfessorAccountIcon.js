// src/components/ProfessorAccountIcon.js
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Importar Ionicons
import { useTheme } from '../context/ThemeContext'; // Importar useTheme para usar as cores

export default function ProfessorAccountIcon() {
  const router = useRouter();

  const navigateToAccount = () => {
    // Ajuste este caminho se a sua rota para ContaProfessorScreen for diferente
    // Este caminho assume que você tem app/(professor)/conta.js mapeando para ContaProfessorScreen.js
    router.push('/(professor)/conta');
  };
  const { theme } = useTheme(); // Acessar o tema para as cores

  return (
    <TouchableOpacity onPress={navigateToAccount} style={styles.container}>
      <Ionicons
        name="person-circle-outline"
        size={38} // Ligeiramente ajustado para corresponder ao estilo avatarIcon
        color={theme.colors.textPrimary} // Cor baseada no tema
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    // O posicionamento será controlado pelo contêiner pai (a nova barra de cabeçalho)
    // Adicionamos padding aqui para o toque ser um pouco maior que o ícone em si, se desejado.
    padding: 5, 
  },
  // O estilo avatarIcon não é mais necessário para o Ionicons,
  // pois size e color são definidos diretamente no componente.
});
