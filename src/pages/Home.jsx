import React, { useState } from "react";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";
import SearchBar from "../components/SearchBar";
import TagFilter from "../components/TagFilter";

const Home = ({ notes, setNotes }) => {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const handlePin = (id) => {
    setNotes(prev =>
      prev.map(n =>
        n.id === id ? { ...n, pinned: !n.pinned } : n
      )
    );
  };

  const handleArchive = (id) => {
    setNotes(prev =>
      prev.map(n =>
        n.id === id ? { ...n, archived: true, pinned: false } : n
      )
    );
  };

  const handleTrash = (id) => {
    setNotes(prev =>
      prev.map(n =>
        n.id === id ? { ...n, trashed: true } : n
      )
    );
  };

  const filteredNotes = notes
    .filter(n => !n.archived && !n.trashed)
    .filter(n => !selectedTag || n.tags?.includes(selectedTag))
    .filter(n =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.description.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => b.pinned - a.pinned);

  return (
    <div className="container">
      <h1>Notes</h1>

      <SearchBar search={search} setSearch={setSearch} />
      <NoteForm setNotes={setNotes} />
      <TagFilter
        selectedTag={selectedTag}
        clearTag={() => setSelectedTag("")}
      />

      <div className="notes-grid">
        {filteredNotes.map(note => (
          <NoteCard
            key={note.id}
            note={note}
            onPin={handlePin}
            onArchive={handleArchive}
            onTrash={handleTrash}
            onTagClick={setSelectedTag}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
