require('dotenv').config();
const express = require('express');
const { response } = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const Person = require('./models/person');

app.use(cors());
app.use(express.json());
app.use(express.static('build'));

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

const requestLogger = (req, res, next) => {
  console.log('Method:', req.method);
  console.log('Path:  ', req.path);
  console.log('Body:  ', req.body);
  console.log('---');
  next();
};

app.use(requestLogger);

// Async!
app.get('/info', async (req, res, next) => {
  try {
    const persons = await Person.find({});
    const numOfPersons = persons.length;
    const date = new Date();
    res.send(
      `<p>Phonebook has info for ${numOfPersons} people</p><p>${date}</p>`
    );
  } catch (err) {
    next(err);
  }
});

// Async!
app.get('/api/persons', async (req, res, next) => {
  try {
    const persons = await Person.find({});
    res.json(persons);
  } catch (err) {
    next(err);
  }
});

// Async!
app.get('/api/persons/:id', async (req, res, next) => {
  try {
    const result = await Person.findById(req.params.id);
    result ? res.json(result) : res.status(404).end();
  } catch (err) {
    next(err);
  }
});

// Async!
app.post('/api/persons', async (req, res, next) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'Content missing',
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  try {
    const personExists = await Person.exists({ name: body.name });
    if (personExists) {
      return res.status(400).json({
        error: 'Name already exists in phonebook. Name must be unique.',
      });
    }
    const savedPerson = await person.save();
    res.json(savedPerson);
  } catch (err) {
    next(err);
  }
});

// Async!
app.delete('/api/persons/:id', async (req, res, next) => {
  try {
    const findAndDelete = await Person.findByIdAndDelete(req.params.id);
    if (!findAndDelete) {
      return res.status(400).json({
        error: 'ID not found!',
      });
    }
    const persons = await Person.find({});
    res.json(persons);
  } catch (err) {
    next(err);
  }
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }

  next(err);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
