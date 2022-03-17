const express = require('express');

const app = express();

const db = require('./models/index');

const { Title } = db;

app.use(express.json());

app.use(express.static(__dirname));

app.get('/', (req, res) => res.send('URL should contain /home'));

app.get('/home', async (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/:page', async (req, res) => {
  const { page } = req.params;
  res.sendFile(__dirname + `/${page}.html`);
});

app.get('/title/:id', async (req, res) => {
  const { id } = req.params;
  const title = await Title.findOne({ where: { id }});
  if (title) {
    res.send(title);
  } else {
    res.status(404).send({ message: 'There is no title with the id' });
  }
});

app.listen(3000, () => {
  console.log('Server is listening...');
});