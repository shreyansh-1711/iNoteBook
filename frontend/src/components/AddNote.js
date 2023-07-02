import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const{addNote}=context;
    const [note, setNote] = useState({title: "", description: "", tag: ""})
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title: "", description: "", tag: ""});
        props.showAlert("Added successfully", "success")
    }

    const onChange=(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <div className="container">
      <h1 className="my-3">Add a note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" value={note.title} id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={5} required/>
          <div id="emailHelp" className="form-text"></div>
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" value={note.description} id="description" name="description" onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" value={note.tag} id="tag" name="tag" onChange={onChange} minLength={5} required />
        </div>
        <button disabled={note.title.length<5 || note.description.length<5 } type="submit" className="btn btn-dark " onClick={handleClick}>Add note</button>
      </form>
      </div>
  )
}

export default AddNote
