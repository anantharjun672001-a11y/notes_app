import React from 'react';

const Archive = ({notes,setNotes}) => {

    const handleUnarchive = (id)=>{
        setNotes (prevNotes=>
            prevNotes.map(note=>
                note.id === id ? {...note , archived:false} : note
            )
        )
    }

    return (
        <div>
            <h1>Archive</h1>
            {notes
                .filter(note=> note.archived)
                .map((note)=>{
                    return(
                        <div key={note.id}>
                            <p>{note.title}</p>
                            <p>{note.description}</p>
                            <button onClick={() => handleUnarchive(note.id)}>
                                Unarchive
                            </button>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Archive;