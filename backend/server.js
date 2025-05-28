const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000; // Você pode escolher outra porta se esta estiver em uso

app.use(cors()); // Habilita o CORS para todas as rotas
app.use(express.json()); // Permite que o servidor entenda JSON no corpo das requisições

// "Banco de dados" em memória para matérias
let materiasDB = [
  { id: 'm1', nome: 'Metodologia Científica Aplicada a Projetos', descricao: 'Fundamentos da pesquisa científica e sua aplicação.' },
  { id: 'm2', nome: 'Introdução à Engenharia Espacial', descricao: 'Conceitos básicos sobre foguetes, satélites e exploração espacial.' },
  { id: 'm3', nome: 'Programação para Projetos Interativos', descricao: 'Desenvolvimento de software com foco em interatividade.' },
];
let proximoIdMateria = 4; // Para gerar IDs únicos simples

// Rota para LISTAR todas as matérias
app.get('/api/materias', (req, res) => {
  console.log('GET /api/materias solicitado');
  res.json(materiasDB);
});

// Rota para CRIAR uma nova matéria
app.post('/api/materias', (req, res) => {
  console.log('POST /api/materias solicitado com corpo:', req.body);
  const { nome, descricao } = req.body;

  if (!nome) {
    return res.status(400).json({ error: 'O nome da matéria é obrigatório.' });
  }

  const novaMateria = {
    id: `m${proximoIdMateria++}`,
    nome,
    descricao: descricao || '', // Descrição é opcional
  };
  materiasDB.push(novaMateria);
  console.log('Nova matéria criada:', novaMateria);
  res.status(201).json(novaMateria);
});

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor SpaceLearn Backend está no ar!');
});

app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}`);
});

// Futuramente: Adicionar rotas para GET /api/materias/:id, PUT /api/materias/:id, DELETE /api/materias/:id