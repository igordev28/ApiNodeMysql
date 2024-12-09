
const express = require('express');
const app = express();
const connection = require('./db'); // Importando a conexão com o MySQL


app.use(express.json());


app.get('/produtos', (req, res) => {
  connection.query('SELECT * FROM produtos', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao consultar produtos', details: err });
    }
    res.status(200).json(results);
  });
});


app.get('/produtos/:id', (req, res) => {
  const { id } = req.params;
  connection.query('SELECT * FROM produtos WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao consultar produto', details: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.status(200).json(results[0]);
  });
});


app.post('/produtos', (req, res) => {
  const { nome, quantidade, preco } = req.body;
  
  if (!nome || !quantidade || !preco) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  const query = 'INSERT INTO produtos (nome, quantidade, preco) VALUES (?, ?, ?)';
  connection.query(query, [nome, quantidade, preco], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao inserir produto', details: err });
    }

    const novoProduto = { id: results.insertId, nome, quantidade, preco };
    res.status(201).json(novoProduto);
  });
});


app.put('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const { nome, quantidade, preco } = req.body;

  const query = 'UPDATE produtos SET nome = ?, quantidade = ?, preco = ? WHERE id = ?';
  connection.query(query, [nome, quantidade, preco, id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao atualizar produto', details: err });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.status(200).json({ id, nome, quantidade, preco });
  });
});


app.delete('/produtos/:id', (req, res) => {
  const { id } = req.params;
  
  const query = 'DELETE FROM produtos WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao deletar produto', details: err });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.status(200).json({ message: 'Produto deletado com sucesso' });
  });
});


const PORT = process.env.PORT || 3020;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
