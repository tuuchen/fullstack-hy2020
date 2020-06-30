import React, { useState } from "react";
import Note from "./components/Note";

const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  const addNote = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target[0].value);

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: Date.now(),
    };

    setNotes(notes.concat(noteObject));
    setNewNote("a new note...");
    console.log(notes);
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;

/* notes.filter(note => note.important)

 const result = notes.map((note) => note.id);
     const result = notes.map((note) => {
      return note.id;
    });
    console.log(result); */

/* handleSubmit = (event) => {
      event.preventDefault();
      console.log(event.target.elements.username.value) // from elements property
      console.log(event.target.username.value) // or directly
    }
    
    <input type="text" name="username"/> */
