import React, { useState } from 'react';

const NoteForm = ({setNotes}) => {
    const[title,setTitle]=useState("");
    const[ description,setDescription]=useState("");

    const handleAddNote = () => {
        if(!title) return;
            const newNote = {
            id: Date.now(),
            title: title,
            description:  description,
            pinned: false,
            archived: false,
            trashed: false
        };
        setNotes(prevNotes=>[...prevNotes,newNote]);
        setTitle("");
        setDescription("");
     
    };
    return (
        <div>
            <input
                type='text'
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                placeholder='Enter the title'

            />
            <textarea
                value={ description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
            />
           
            <button onClick={handleAddNote}>Add Notes</button>
        </div>
    );
   
}

export default NoteForm;