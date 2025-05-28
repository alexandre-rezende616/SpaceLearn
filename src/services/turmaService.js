import turmasMock from '../data/turmasMock';

// Simula a busca de todas as turmas
export const fetchTurmas = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([...turmasMock]); // Retorna uma cópia
    }, 150);
  });
};

// Simula a criação de uma nova turma
export const criarTurma = async (dadosNovaTurma) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const novaTurma = {
        ...dadosNovaTurma,
        id: `turma${Date.now()}`, // ID único simples
        alunos: dadosNovaTurma.alunos || 0, // Default para alunos
        ultimaAtividade: dadosNovaTurma.ultimaAtividade || 'Nenhuma atividade recente',
      };
      turmasMock.push(novaTurma);
      console.log('Turma criada (mock):', novaTurma);
      console.log('Todas as turmas (mock):', turmasMock);
      resolve(novaTurma);
    }, 150);
  });
};

// Futuramente: fetchTurmaPorId, atualizarTurma, deletarTurma, fetchTurmasPorMateriaId