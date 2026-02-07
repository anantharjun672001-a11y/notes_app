import React from 'react';

const Trash = ({notes,setNotes}) => {
    
    return (
        <div>
            <h1>Trash</h1>

            {notes
                .filter(note=>note.trashed)
                .map((note)=>{
                    return(
                        <div key={note.id}>
                            <p>{note.title}</p>
                            <button>Restore</button>
                            <button>Delete Forever</button>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Trash;