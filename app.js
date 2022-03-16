const express = require('express');

const app = express();

app.use(express.json());

app.use(express.static(__dirname));

app.get('/', (req, res) => res.send('URL should contain /api/..'));

app.get('/index', async (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => {
  console.log('Server is listening...');
});