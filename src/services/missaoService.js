// c:\Users\xandi\SpaceLearn\src\services\missaoService.js
import missoesMock from '../data/missoesMock';

// Simula a busca de todas as missões
export const fetchAllMissoes = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([...missoesMock]); // Retorna uma cópia de todas as missões
    }, 150);
  });
};

// Simula a busca de uma missão específica por ID
export const fetchMissaoPorId = async (missaoId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const missaoEncontrada = missoesMock.find(missao => missao.id === missaoId);
      if (missaoEncontrada) {
        resolve({ ...missaoEncontrada }); // Retorna uma cópia
      } else {
        reject(new Error('Missão não encontrada.'));
      }
    }, 100);
  });
};

// Futuramente: fetchMissoesPorTurma, atualizarStatusMissao, etc.
