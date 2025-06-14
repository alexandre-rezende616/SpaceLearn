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
      const errorText = await response.text();
      try {
        const errorData = JSON.parse(errorText);
        throw new Error(errorData.error || errorData.message || `Erro HTTP: ${response.status} - ${errorText}`);
      } catch (e) {
        throw new Error(`Erro HTTP: ${response.status} - ${errorText}`);
      }
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
    console.log('Token enviado para criarMateria:', token);
    const response = await fetch(`${API_BASE_URL}/materias`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novaMateriaData),
    });
    if (!response.ok) {
      // Tenta ler a resposta como texto, pois erros como 403 podem não retornar JSON.
      const errorText = await response.text();
      try {
        // Tenta analisar como JSON se possível, para mensagens de erro estruturadas do backend.
        const errorData = JSON.parse(errorText);
        throw new Error(errorData.error || errorData.message || `Erro HTTP: ${response.status} - ${errorText}`);
      } catch (e) {
        // Se não for JSON, usa o texto do erro diretamente.
        throw new Error(`Erro HTTP: ${response.status} - ${errorText}`);
      }
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
      const errorText = await response.text();
      try {
        const errorData = JSON.parse(errorText);
        throw new Error(errorData.error || errorData.message || `Erro HTTP: ${response.status} - ${errorText}`);
      } catch (e) {
        throw new Error(`Erro HTTP: ${response.status} - ${errorText}`);
      }
    }

    // Para DELETE, a resposta pode não ter um corpo JSON ou ser um 204 No Content.
    // Se houver um corpo, como a mensagem de sucesso, podemos retorná-lo.
    // Se a resposta for 204, response.json() pode falhar.
    if (response.status === 204) return { success: true, message: 'Matéria deletada com sucesso.' }; // Retorno customizado para 204
    return await response.json();
  } catch (error) {
    console.error('Erro ao deletar matéria:', error);
    throw error;
  }
};