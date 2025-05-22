// src/components/ProfessorAccountIcon.js
import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function ProfessorAccountIcon() {
  const router = useRouter();

  const navigateToAccount = () => {
    // Ajuste este caminho se a sua rota para ContaProfessorScreen for diferente
    // Este caminho assume que você tem app/(professor)/conta.js mapeando para ContaProfessorScreen.js
    router.push('/(professor)/conta');
  };

  return (
    <TouchableOpacity onPress={navigateToAccount} style={styles.container}>
      <Image
        source={require('@/../assets/images/avatarr.png')} // Usando o mesmo caminho de AlunosScreen
        style={styles.avatarIcon}
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
  avatarIcon: { // Renomeado para clareza e evitar conflitos
    width: 40, // Tamanho do avatar
    height: 40,
    borderRadius: 20, // Metade da largura/altura para ser circular
  },
});
