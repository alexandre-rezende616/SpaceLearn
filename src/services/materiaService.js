import materiasMock from '../data/materiasMock';
// import materiasMock from '../data/materiasMock'; // Não vamos mais usar o mock



const API_BASE_URL = 'http://192.168.0.191:3000/api';

// Simula a busca de todas as matérias
export const fetchMaterias = async () => {
  try {
    console.log(`Buscando matérias de: ${API_BASE_URL}/materias`);
    const response = await fetch(`${API_BASE_URL}/materias`);
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

// Simula a criação de uma nova matéria
export const criarMateria = async (novaMateriaData) => {
  try {
    console.log(`Criando matéria em: ${API_BASE_URL}/materias com dados:`, novaMateriaData);
    const response = await fetch(`${API_BASE_URL}/materias`, {
      method: 'POST',
      headers: {
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

// Simula a atualização de uma matéria