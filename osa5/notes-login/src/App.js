import React, { useState, useEffect } from 'react'
import Footer from './components/Footer'
import Note from './components/Note'
import Notification from './components/Notification'
import noteService from './services/notes'
import loginService from './services/login'

import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log('effect')
    noteService.getAll().then((initialNotes) => {
      console.log('promise fulfilled')
      setNotes(initialNotes)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target[0].value)

    if (!newNote) return

    const noteObject = {
      id: Date.now(),
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    }

    noteService
      .create(noteObject)
      .then((returnedNote) => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
      .catch((error) => {
        setErrorMessage(error.message)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const toggleImportanceOf = (id) => {
    console.log(`importance of ${id} needs to be toggled`)
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }
    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
      })
      .catch((error) => {
        setErrorMessage(
          error,
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    // event.target.reset()
    if (!username || !password) return
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))

      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    if (!window.confirm('Logout?')) return

    console.log('Logout!')
    window.localStorage.removeItem('loggedNoteappUser')
    // window.localStorage.clear()
    setUser(null)
    noteService.setToken(null)
  }

  const handleUserChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handlePasswordChange={handlePasswordChange}
          handleUserChange={handleUserChange}
        />
      ) : (
        <NoteForm
          user={user.name}
          addNote={addNote}
          newNote={newNote}
          handleNoteChange={handleNoteChange}
          handleLogout={handleLogout}
        />
      )}
      <br />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <Footer text="Note app, Department of Computer Science, University of Helsinki 2020" />
    </div>
  )
}

export default App
