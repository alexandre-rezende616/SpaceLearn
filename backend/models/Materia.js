const mongoose = require('mongoose');

const MateriaSchema = new mongoose.Schema({
  nome: { type: String, required: true, unique: true, trim: true },
  descricao: { type: String, trim: true },
  // Futuramente: professorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Materia', MateriaSchema);
