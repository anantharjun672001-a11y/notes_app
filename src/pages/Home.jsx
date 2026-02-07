import React from 'react';
import NoteForm from "../components/NoteForm"

const Home = ({notes,setNotes}) => {
    const handlePin=(id)=>{
        setNotes(prevNotes=>
            prevNotes.map(note=>
                note.id === id ? {...note,pinned : !note.pinned} : note
            )
        )
    }

    const handleTrash = (id)=>{
        setNotes(prevNotes=>
            prevNotes.map(note=>
                note.id === id ? {...note ,trashed:true} : note
            )
        )
    }

    return (
        <div>
            <h1>Home</h1>
            <NoteForm  setNotes={setNotes}/>
           
            {notes
             .filter(note => !note.trashed)
             .slice()
             .sort((a, b) => b.pinned - a.pinned)
             .map((note)=>{
                return(
                    <div key={note.id}>
                        <p>{note.title}</p>
                        <p>{note.description}</p>
                        <button onClick={()=>handlePin(note.id)}>
                            {note.pinned ? "Unpin" : "Pin"}
                        </button>
                        <button onClick={()=>handleTrash(note.id)}>
                            Delete
                        </button>
                    </div>
                )
            })
    
            }
            
           
        </div>
    );
};

export default Home;