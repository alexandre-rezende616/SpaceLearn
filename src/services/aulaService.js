
// c:\Users\xandi\SpaceLearn\src\services\aulaService.js
import aulasMock from '../data/aulasMock';

// Simula a busca de aulas por ID da turma
export const fetchAulasPorTurma = async (turmaId) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const aulasDaTurma = aulasMock.filter(aula => aula.turmaId === turmaId);
      resolve([...aulasDaTurma]); // Retorna uma cópia
    }, 150);
  });
};

// Simula a busca de todas as aulas (para a visão do aluno, por exemplo)
export const fetchAllAulas = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([...aulasMock]); // Retorna uma cópia de todas as aulas
    }, 150);
  });
};

// Simula a criação de uma nova aula
export const criarAula = async (dadosNovaAula) => {
  return new Promise((resolve, reject) => { // Adicionado reject para tratamento de erro
    setTimeout(() => {
      if (!dadosNovaAula.turmaId || !dadosNovaAula.titulo || !dadosNovaAula.conteudo) {
        // No backend real, essa validação seria mais robusta
        return reject(new Error('Dados da aula incompletos. TurmaId, título e conteúdo são obrigatórios.'));
      }
      const novaAula = {
        ...dadosNovaAula,
        id: `aula${Date.now()}`, // ID único simples
        dataPublicacao: new Date().toISOString().split('T')[0], // Data atual no formato YYYY-MM-DD
        visualizadaPorAlunos: 0, // Nova aula começa com 0 visualizações
      };
      aulasMock.push(novaAula);
      console.log('Aula criada (mock):', novaAula);
      // console.log('Todas as aulas (mock):', aulasMock); // Pode ser útil para debug
      resolve(novaAula);
    }, 150);
  });
};

// Simula a busca de uma aula específica por ID
export const fetchAulaPorId = async (aulaId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const aulaEncontrada = aulasMock.find(aula => aula.id === aulaId);
      if (aulaEncontrada) {
        resolve({ ...aulaEncontrada }); // Retorna uma cópia
      } else {
        reject(new Error('Aula não encontrada.'));
      }
    }, 100);
  });
};
// Futuramente: atualizarAula, deletarAula
