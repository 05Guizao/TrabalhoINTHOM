const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configurar o middleware
app.use(cors());
app.use(bodyParser.json());

// Conexão com PostgreSQL
const pool = new Pool({
  user: 'postgreso',
  host: 'localhost',
  database: 'INTHOM',
  password: 'Guicas2005_',
  port: 5432,
});

// Rota de registro
app.post('/api/register', async (req, res) => {
  const { nome, apelido, email, pass } = req.body;
  try {
    await pool.query(
      'INSERT INTO utilizador (nome, apelido, email, pass) VALUES ($1, $2, $3, $4)',
      [nome, apelido, email, pass]
    );
    res.status(201).send('Utilizador registado com sucesso');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao registar utilizador');
  }
});

// Rota de login
app.post('/api/login', async (req, res) => {
  const { email, pass } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM utilizador WHERE email = $1 AND pass = $2',
      [email, pass]
    );
    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Login bem-sucedido', user: result.rows[0] });
    } else {
      res.status(401).send('Credenciais inválidas');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao iniciar sessão');
  }
});

app.listen(port, () => {
  console.log(`Servidor backend a correr em http://localhost:${port}`);
});
