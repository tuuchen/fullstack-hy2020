const express = require('express');
const { response } = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('build'))

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      tokens.body(req, res),
    ].join(' ');
  })
);

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method);
  console.log('Path:  ', request.path);
  console.log('Body:  ', request.body);
  console.log('---');
  next();
};

app.use(requestLogger);

const generateId = () => {
  return Math.round(Date.now() + Math.random());
};

// Phonebook
const phonebook = {
  persons: [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ],
};

app.get('/info', (req, res) => {
  const numOfPersons = phonebook.persons.length;
  const date = new Date();
  res.send(
    `<p>Phonebook has info for ${numOfPersons} people</p><p>${date}</p>`
  );
});

app.get('/api/persons', (req, res) => {
  res.json(phonebook.persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = phonebook.persons.find((n) => n.id === id);
  person ? res.json(person) : res.status(404).end();
});

app.post('/api/persons', (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Content missing',
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  const match = phonebook.persons.find((n) => n.name === body.name);
  if (match) {
    return res.status(400).json({
      error: 'Name already exists in phonebook. Name must be unique.',
    });
  }
  phonebook.persons.push(person);
  res.json(person);
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const match = phonebook.persons.find((n) => n.id === id);
  if (!match) {
    return res.status(400).json({
      error: 'ID not found!',
    });
  }
  const person = phonebook.persons.filter((n) => n.id !== id);
  phonebook.persons = person;
  res.json(phonebook.persons);
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
