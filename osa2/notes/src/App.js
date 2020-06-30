import React from "react";
import Note from "./components/Note";

const App = ({ notes }) => {
  /* const result = notes.map((note) => note.id);
     const result = notes.map((note) => {
      return note.id;
    });
  
    console.log(result); */

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
    </div>
  );
};

export default App;
