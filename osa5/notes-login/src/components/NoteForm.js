import React from 'react'

const NoteForm = ({
  user,
  addNote,
  newNote,
  handleNoteChange,
  handleLogout,
}) => (
  <>
    <p>{user} logged in</p>
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleNoteChange} />
      <button type="submit">save</button>&nbsp;&nbsp;&nbsp;&nbsp;
      <button type="button" onClick={handleLogout}>
        logout
      </button>
    </form>
  </>
)

export default NoteForm
