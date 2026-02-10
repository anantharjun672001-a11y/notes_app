import { useState } from "react";
import SearchBar from "../components/SearchBar";
import TopStats from "../components/TopStats";
import NoteModal from "../components/NoteModal";
import NoteCard from "../components/NoteCard";

const Home = ({ notes, setNotes }) => {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [open, setOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const updateNote = (updatedNote) => {
    setNotes(prev =>
      prev.map(n => n.id === updatedNote.id ? updatedNote : n)
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold">My Notes</h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
        onCreate={() => {
          setEditingNote(null);
          setOpen(true);
        }}
      />

      <TopStats notes={notes} />

      <div className="flex flex-wrap gap-6 mt-6">
        {notes
          .filter(n => !n.archived && !n.trashed)
          .filter(n => !selectedTag || n.tags.includes(selectedTag))
          .filter(n =>
            n.title.toLowerCase().includes(search.toLowerCase()) ||
            n.description.toLowerCase().includes(search.toLowerCase())
          )
          .map(note => (
            <NoteCard
              key={note.id}
              note={note}
              mode="home"
              onEdit={(note) => {
                setEditingNote(note);
                setOpen(true);
              }}
              onPin={(id) =>
                setNotes(p =>
                  p.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n)
                )
              }
              onArchive={(id) =>
                setNotes(p =>
                  p.map(n => n.id === id ? { ...n, archived: true } : n)
                )
              }
              onTrash={(id) =>
                setNotes(p =>
                  p.map(n => n.id === id ? { ...n, trashed: true } : n)
                )
              }
              onTagClick={setSelectedTag}
            />
          ))}
      </div>

      {open && (
        <NoteModal
          note={editingNote}
          onClose={() => {
            setOpen(false);
            setEditingNote(null);
          }}
          onAdd={(note) => setNotes(p => [...p, note])}
          onUpdate={updateNote}
        />
      )}
    </div>
  );
};

export default Home;
