const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conecte ao MongoDB (troque <MONGODB_URI> pela URI do seu banco)
mongoose.connect('mongodb+srv://tracknotrash:trackzudo@cluster0.mongodb.net/dateplanner?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB:', err));
  

// Crie o modelo para salvar as respostas
const ResponseSchema = new mongoose.Schema({
  date: String,
  time: String,
  activity: String,
});

const Response = mongoose.model('Response', ResponseSchema);

// Rota para salvar respostas
app.post('/responses', async (req, res) => {
  try {
    const response = new Response(req.body);
    await response.save();
    res.status(201).send('Resposta salva com sucesso!');
  } catch (err) {
    res.status(500).send('Erro ao salvar a resposta');
  }
});

// Rota para obter todas as respostas
app.get('/responses', async (req, res) => {
  try {
    const responses = await Response.find();
    res.status(200).json(responses);
  } catch (err) {
    res.status(500).send('Erro ao buscar respostas');
  }
});

// Iniciar o servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
