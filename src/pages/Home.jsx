import React, { useState } from 'react';
import NoteForm from "../components/NoteForm"

const Home = ({notes,setNotes}) => {
    const[search,setSearch] = useState("");
    const[selectedTag,setSelectedTag] = useState("");

    const handlePin=(id)=>{
        setNotes(prevNotes=>
            prevNotes.map(note=>
                note.id === id ? {...note,pinned : !note.pinned} : note
            )
        )
    }

    const handleArchive =(id) =>{
        setNotes(prevNotes=>
            prevNotes.map(note=>
                note.id === id ? {...note, archived : true ,pinned:false} : note
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
            <input
                type='text'
                placeholder='Search here..'
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
            />

            <NoteForm  setNotes={setNotes}/>

            {notes
             .filter(note => !note.archived && !note.trashed)
             .filter(note => !selectedTag || note.tags ?.includes(selectedTag))
             .filter(note =>
                note.title.toLowerCase().includes(search.toLowerCase()) ||
                note.description.toLowerCase().includes(search.toLowerCase())
             )
             .slice()
             .sort((a, b) => b.pinned - a.pinned)
             .map((note)=>{
                return(
                    <div key={note.id}>
                        <p>{note.title}</p>
                        <p>{note.description}</p>
                         <div>
                            {note.tags?.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                            >
                                #{tag}
                            </button>
                            ))}
                        </div>
                        <button onClick={()=>handlePin(note.id)}>
                            {note.pinned ? "Unpin" : "Pin"}
                        </button>
                        <button onClick={()=>handleArchive(note.id)}>
                            Archive
                        </button>
                        <button onClick={()=>handleTrash(note.id)}>
                            Delete
                        </button>
                        {selectedTag && (
                        <button onClick={() => setSelectedTag("")}>
                            Clear Tag Filter
                        </button>
                        )}
                    </div>
                )
            })
    
            }
            
           
        </div>
    );
};

export default Home;