import React from 'react';

const Trash = ({notes,setNotes}) => {
    const handleRestore = (id)=>{
        setNotes(prevNotes=>
            prevNotes.map(note=>
                note.id === id ? {...note,trashed:false} : note
            )
        )
    }

    const handleDeleteForever = (id) =>{
        setNotes(prevNotes => prevNotes.filter (note=> note.id !== id))
    }
    return (
        <div>
            <h1>Trash</h1>

            {notes
                .filter(note=>note.trashed)
                .map((note)=>{
                    return(
                        <div key={note.id}>
                            <p>{note.title}</p>
                            <button onClick={()=>handleRestore(note.id)}>Restore</button>
                            <button onClick={()=>handleDeleteForever(note.id)}>Delete Forever</button>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Trash;