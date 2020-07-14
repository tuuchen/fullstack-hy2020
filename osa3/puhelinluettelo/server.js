const express = require('express');
const { response } = require('express');
const cors = require('cors');
const fs = require('fs');
const morgan = require('morgan');
const app = express();

app.use(cors());
app.use(express.json());

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

const readPersons = (callback) => {
  fs.readFile('db.json', (err, data) => {
    if (err) throw err;
    const person = JSON.parse(data);
    callback(null, person);
  });
};

app.get('/info', (req, res) => {
  readPersons((err, content) => {
    const numOfPersons = content.persons.length;
    const date = new Date();
    res.send(
      `<p>Phonebook has info for ${numOfPersons} people</p><p>${date}</p>`
    );
  });
});

app.get('/api/persons', (req, res) => {
  readPersons((err, content) => {
    res.json(content);
  });
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  readPersons((err, content) => {
    const person = content.persons.find((n) => n.id === id);
    person ? res.json(person) : res.status(404).end();
  });
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

  readPersons((err, content) => {
    const match = content.persons.find((n) => n.name === body.name);
    if (match) {
      return res.status(400).json({
        error: 'Name already exists in phonebook. Name must be unique.',
      });
    }
    content.persons.push(person);
    let newPerson = JSON.stringify(content);
    fs.writeFile('db.json', newPerson, (err) => {
      if (err) throw err;
      console.log('done');
      res.json(content);
    });
  });
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  readPersons((err, content) => {
    const match = content.persons.find((n) => n.id === id);
    if (!match) {
      return res.status(400).json({
        error: 'ID not found!',
      });
    }
    const person = content.persons.filter((n) => n.id !== id);
    content.persons = person;
    let newPerson = JSON.stringify(content);
    fs.writeFile('db.json', newPerson, (err) => {
      if (err) throw err;
      console.log('done');
      res.json(content);
    });
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
