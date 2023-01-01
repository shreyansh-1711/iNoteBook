
import NoteContext from "./noteContext";
import { useState } from "react";


const NoteState = (props) => {

  const noteInitial = [
    {
      "_id": "63aa760407d62f3adfe9e5c5",
      "user": "63a4529db4657e528eded938",
      "title": "My title",
      "description": "Please do fast",
      "tag": "Personal",
      "date": "2022-12-27T04:35:16.750Z",
      "__v": 0
    },
    {
      "_id": "63aa760507d62f3adfe9e5c7",
      "user": "63a4529db4657e528eded938",
      "title": "My title",
      "description": "Please do fast",
      "tag": "Personal",
      "date": "2022-12-27T04:35:17.397Z",
      "__v": 0
    }
  ]

  const [notes, setNotes] = useState(noteInitial)

  
      // Add a Note
      const addNote = (title, description, tag)=>{
        // TODO: API Call
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
      const deleteNote = (id)=>{
        console.log("Deleting" + id)
        const newNotes = notes.filter((note)=>{return note._id !== id})
        setNotes(newNotes) ;
      }
      // Edit a Note
      const editNote = (id, title, description, tag)=>{

      }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}


export default NoteState;