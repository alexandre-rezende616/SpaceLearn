const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Carrega variáveis do arquivo .env
const User = require('./models/User');
const Materia = require('./models/Materia');
const app = express();
const port = process.env.PORT || 3000; // Usa a porta do .env ou 3000 como padrão

// Conexão com MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado com sucesso!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

app.use(cors()); // Habilita o CORS para todas as rotas
app.use(express.json()); // Permite que o servidor entenda JSON no corpo das requisições

// --- ROTAS DE AUTENTICAÇÃO ---
app.post('/api/auth/register', async (req, res) => {
  try {
    const { nome, email, senha, role } = req.body;

    if (!nome || !email || !senha || !role) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios (nome, email, senha, role).' });
    }
    if (!['aluno', 'professor'].includes(role)) {
      return res.status(400).json({ message: 'O campo "role" deve ser "aluno" ou "professor".' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Já existe um usuário com este email.' });
    }

    const newUser = new User({ nome, email, senha, role });
    await newUser.save();

    // Gerar token JWT
    const payload = { userId: newUser._id, role: newUser.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({
      token,
      user: { id: newUser._id, nome: newUser.nome, email: newUser.email, role: newUser.role },
      message: 'Usuário registrado com sucesso!'
    });
  } catch (error) {
    console.error("Erro no registro:", error);
    res.status(500).json({ message: 'Erro interno do servidor ao registrar usuário.', error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) {
      return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas (email não encontrado).' });
    }

    const isMatch = await user.comparePassword(senha);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas (senha incorreta).' });
    }

    const payload = { userId: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(200).json({
      token,
      user: { id: user._id, nome: user.nome, email: user.email, role: user.role },
      message: 'Login bem-sucedido!'
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: 'Erro interno do servidor ao fazer login.', error: error.message });
  }
});

// Rota para LISTAR todas as matérias
app.get('/api/materias', async (req, res) => {
  try {
    console.log('GET /api/materias solicitado');
    const materias = await Materia.find().sort({ nome: 1 }); // Ordena por nome
    res.status(200).json(materias);
  } catch (error) {
    console.error("Erro ao buscar matérias:", error);
    res.status(500).json({ message: 'Erro ao buscar matérias.', error: error.message });
  }
});

// Rota para CRIAR uma nova matéria
// TODO: Proteger esta rota para que apenas professores possam criar matérias
app.post('/api/materias', async (req, res) => {
  try {
    console.log('POST /api/materias solicitado com corpo:', req.body);
    const { nome, descricao } = req.body;
    if (!nome) {
      return res.status(400).json({ message: 'O nome da matéria é obrigatório.' });
    }
    const novaMateria = new Materia({ nome, descricao });
    await novaMateria.save();
    console.log('Nova matéria criada:', novaMateria);
    res.status(201).json(novaMateria);
  } catch (error) {
    console.error("Erro ao criar matéria:", error);
    if (error.code === 11000) { // Código de erro para duplicidade de chave (unique)
      return res.status(400).json({ message: 'Já existe uma matéria com este nome.', error: error.message });
    }
    res.status(500).json({ message: 'Erro ao criar matéria.', error: error.message });
  }
});

// Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor SpaceLearn Backend está no ar!');
});

app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}`);
});
// Futuramente: Adicionar rotas para GET /api/materias/:id, PUT /api/materias/:id, DELETE /api/materias/:id