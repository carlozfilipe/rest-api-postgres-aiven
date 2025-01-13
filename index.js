const express = require('express');

const app = express();
app.use(express.json());

app.use('/categories', require('./src/routes/categoryRoute'));

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000, meu garoto!');
});
