require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const Note = require('./models/note')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const requestLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('---')
  next()
}

app.use(requestLogger)

app.get('/api/notes', (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes.map((note) => note.toJSON()))
  })
})

app.get('/api/notes/:id', (req, res, next) => {
  Note.findById(req.params.id)
    .then((note) => (note ? res.json(note.toJSON()) : res.status(404).end()))
    .catch((error) => next(error))
})

app.post('/api/notes', (req, res, next) => {
  const body = req.body

  if (!body.content) {
    return res.status(400).json({
      error: 'content missing',
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note
    .save()
    .then((savedNote) => {
      res.json(savedNote.toJSON())
    })
    .catch((err) => next(err))
})

app.put('/api/notes/:id', (req, res, next) => {
  const body = req.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(req.params.id, note, { new: true })
    .then((updatedNote) => {
      res.json(updatedNote.toJSON())
    })
    .catch((error) => next(error))
})

app.delete('/api/notes/:id', (req, res, next) => {
  Note.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (err, req, res, next) => {
  console.error(err.message)

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }

  next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
