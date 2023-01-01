
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

return(
    <NoteContext.Provider value= {{notes}}>
            {props.children}
    </NoteContext.Provider>
)
}


export default NoteState;