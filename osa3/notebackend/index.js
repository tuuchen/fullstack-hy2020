const express = require('express');
const { response } = require('express');
const cors = require('cors')
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.static('build'))

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2020-01-10T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2020-01-10T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2020-01-10T19:20:14.298Z',
    important: true,
  },
  {
    id: 4,
    content: 'VS Code REST client is pretty good',
    date: new Date(),
    important: true,
  },
];

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((n) => n.id === id);
  note ? res.json(note) : res.status(404).end();
});

app.post('/api/notes', (req, res) => {
  const body = req.body;

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing',
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  };

  notes = notes.concat(note);
  res.json(note);
});

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((n) => n.id !== id);
  res.status(204).end();
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
