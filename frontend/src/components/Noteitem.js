import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { note, updateNote } = props;
    const { deleteNote } = context;
    return (
        <div className='col-md-3'>
            <div className="card my-2" >
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description} </p>
                    <i className="mx-2 fa-solid fa-trash" onClick={()=>{deleteNote(note._id)}}></i>
                    <i className="mx-2 fa-solid fa-pen-to-square" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
