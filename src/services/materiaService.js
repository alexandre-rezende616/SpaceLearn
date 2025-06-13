// src/services/materiaService.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'http://192.168.0.191:3000/api';

// Busca todas as matérias
export const fetchMaterias = async () => {
  try {
    console.log(`Buscando matérias de: ${API_BASE_URL}/materias`);
    const token = await AsyncStorage.getItem('userToken');
    const response = await fetch(`${API_BASE_URL}/materias`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    const data = await response.json();
    console.log('Matérias recebidas do backend:', data);
    return data;
  } catch (error) {
    console.error('Erro ao buscar matérias:', error);
    throw error; // Re-throw para que o chamador possa tratar
  }
};

// Cria uma nova matéria
export const criarMateria = async (novaMateriaData) => {
  try {
    console.log(`Criando matéria em: ${API_BASE_URL}/materias com dados:`, novaMateriaData);
    const token = await AsyncStorage.getItem('userToken');
    const response = await fetch(`${API_BASE_URL}/materias`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novaMateriaData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Erro HTTP: ${response.status}`);
    }
    const data = await response.json();
    console.log('Matéria criada no backend:', data);
    return data;
  } catch (error) {
    console.error('Erro ao criar matéria:', error);
    throw error;
  }
};

// Deleta uma matéria por ID
export const deleteMateria = async (materiaId) => {
  try {
    console.log(`Deletando matéria em: ${API_BASE_URL}/materias/${materiaId}`);
    const token = await AsyncStorage.getItem('userToken');
    const response = await fetch(`${API_BASE_URL}/materias/${materiaId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        // 'Content-Type': 'application/json', // Não é estritamente necessário para DELETE sem corpo
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: `Erro HTTP: ${response.status}` })); // Tenta pegar JSON, senão usa status
      throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
    }

    // Para DELETE, a resposta pode não ter um corpo JSON ou ser um 204 No Content.
    // Se houver um corpo, como a mensagem de sucesso, podemos retorná-lo.
    return await response.json(); // Ou apenas retornar um status de sucesso se não houver corpo
  } catch (error) {
    console.error('Erro ao deletar matéria:', error);
    throw error;
  }
};