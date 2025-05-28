// c:\Users\xandi\SpaceLearn\src\data\missoesMock.js
const missoesMock = [
  {
    id: 'missao001',
    turmaId: 'turmaOrion', // Pode ser associada a uma turma ou ser geral
    titulo: 'Exploradores do Vácuo',
    descricao: 'Pesquise sobre os principais desafios de operar satélites no vácuo espacial e apresente suas descobertas.',
    tipo: 'Pesquisa',
    status: 'Pendente', // Pendente, Em Andamento, Concluída
    recompensa: 'Medalha "Pioneiro do Vácuo"',
    dataEntrega: '2024-06-15',
  },
  {
    id: 'missao002',
    turmaId: 'turmaNebula',
    titulo: 'Design de Antena Compacta',
    descricao: 'Proponha um design inovador para uma antena de comunicação compacta para um nano-satélite.',
    tipo: 'Desafio Prático',
    status: 'Em Andamento',
    recompensa: '150 Pontos de Exploração',
    dataEntrega: '2024-06-20',
  },
  {
    id: 'missao003',
    titulo: 'História da Corrida Espacial', // Missão geral, sem turmaId específico
    descricao: 'Crie uma linha do tempo interativa dos principais eventos da Corrida Espacial.',
    tipo: 'Criação de Conteúdo',
    status: 'Pendente',
    recompensa: 'Medalha "Historiador Cósmico"',
    dataEntrega: '2024-06-25',
  },
  {
    id: 'missao004',
    turmaId: 'turmaGalileu',
    titulo: 'Análise de Dados de Telescópio',
    descricao: 'Analise um conjunto de dados fornecido de observações de um telescópio e identifique três exoplanetas potenciais.',
    tipo: 'Análise de Dados',
    status: 'Concluída',
    recompensa: '200 Pontos de Exploração + Medalha "Caçador de Planetas"',
    dataEntrega: '2024-05-30',
  },
];

export default missoesMock;