// db.js
const mysql = require('mysql2');
require('dotenv').config(); 

// Obtendo a string de conexão do .env
const connectionString = process.env.CONNECTION_STRING;

// Criando a conexão com o MySQL usando a string de conexão
const connection = mysql.createConnection(connectionString);

// Conectando ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Exportando a conexão para ser usada em outras partes do código
module.exports = connection;
