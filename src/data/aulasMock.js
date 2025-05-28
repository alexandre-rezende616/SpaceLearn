// c:\Users\xandi\SpaceLearn\src\data\aulasMock.js
const aulasMock = [
  {
    id: 'aula101', // ID único para a aula
    turmaId: 'turmaOrion', // ID da Turma Orion (do turmasMock.js)
    titulo: 'Introdução ao Método Científico',
    // materiaNome: 'Metodologia Científica Aplicada a Projetos', // Podemos obter isso da matéria associada à turmaId
    // descricao: 'Uma visão geral sobre os passos e a importância do método científico.', // Pode ser parte do conteúdo
    conteudo: 'Nesta aula, vamos explorar os fundamentos do método científico, suas etapas e a importância da observação e experimentação. Veremos exemplos práticos de como o método científico é aplicado em diversas áreas do conhecimento, com foco em projetos espaciais.',
    // arquivos: [{ nome: 'slides_aula1.pdf', url: 'mock_url_pdf' }], // Simplificando por agora
    // videos: [{ titulo: 'Vídeo Explicativo - Método Científico', url: 'mock_url_video' }], // Simplificando por agora
    dataPublicacao: '2024-05-10',
    visualizadaPorAlunos: 15, // Exemplo de dado adicional
  },
  {
    id: 'aula102',
    turmaId: 'turmaOrion',
    titulo: 'Formulação de Hipóteses',
    conteudo: 'Aprenderemos a identificar problemas de pesquisa relevantes e a formular hipóteses testáveis. Discutiremos a diferença entre hipóteses nulas e alternativas, e como definir variáveis em um estudo científico.',
    dataPublicacao: '2024-05-12',
    visualizadaPorAlunos: 10,
  },
  {
    id: 'aula201',
    turmaId: 'turmaNebula', // ID da Turma Nebula (do turmasMock.js)
    titulo: 'O Ambiente Espacial: Vácuo e Temperaturas Extremas',
    conteudo: 'Uma visão geral sobre as condições extremas encontradas no espaço, incluindo o vácuo, as variações de temperatura e seus efeitos em satélites e astronautas. Abordaremos os desafios de engenharia para proteger equipamentos e seres humanos.',
    dataPublicacao: '2024-05-11',
    visualizadaPorAlunos: 18,
  },
  {
    id: 'aula301',
    turmaId: 'turmaGalileu', // ID da Turma Galileu (do turmasMock.js)
    titulo: 'Princípios de Funcionamento de Painéis Solares',
    conteudo: 'Exploraremos como os painéis solares convertem a luz do sol em eletricidade, os diferentes tipos de células fotovoltaicas e sua aplicação em missões espaciais para fornecimento de energia.',
    dataPublicacao: '2024-05-13',
    visualizadaPorAlunos: 20,
  },
];

export default aulasMock;
