
import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {
  const host = "https://localhost:5000"

  const noteInitial = []

  const [notes, setNotes] = useState(noteInitial)


  // GEt all notes
 // Get all Notes
 const getNotes = async () => {
  // API Call 
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhNDUyOWRiNDY1N2U1MjhlZGVkOTM4In0sImlhdCI6MTY3MTcxMzQzN30.a4CZ7CXYCpihYLJ_GYwDbuIcORejFxZCrmli54-GSNs"
    }
  });
  const json = await response.json()
  console.log(json)
  // setNotes(json)
}

  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhNDUyOWRiNDY1N2U1MjhlZGVkOTM4In0sImlhdCI6MTY3MTcxMzQzN30.a4CZ7CXYCpihYLJ_GYwDbuIcORejFxZCrmli54-GSNs'
      },
      body: JSON.stringify({ title, description, tag })
    });
    // const json = response.json();



    console.log("Adding a new note")
    const note = {
      "_id": "61322f119553781a8ca8d0e08",
      "user": "6131dc5e3e4037cd4734a0664",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-09-03T14:20:09.668Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }

  // Delete a Note
  const deleteNote = (id) => {
    console.log("Deleting" + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);
  }
  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhNDUyOWRiNDY1N2U1MjhlZGVkOTM4In0sImlhdCI6MTY3MTcxMzQzN30.a4CZ7CXYCpihYLJ_GYwDbuIcORejFxZCrmli54-GSNs'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();



    // Logic to edit cxlient
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }

  return (
    <NoteContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState;