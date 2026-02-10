import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Archive from "./pages/Archive";
import Trash from "./pages/Trash";
import Pinned from "./pages/Pinned";

const App = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("notes");
    if (stored) setNotes(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home notes={notes} setNotes={setNotes} />} />
        <Route path="/pinned" element={<Pinned notes={notes} setNotes={setNotes} />} />
        <Route path="/archive" element={<Archive notes={notes} setNotes={setNotes} />} />
        <Route path="/trash" element={<Trash notes={notes} setNotes={setNotes} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
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
import NoteCard from "../components/NoteCard";

const Archive = ({ notes, setNotes }) => {

  const unarchive = (id) => {
    setNotes(prev =>
      prev.map(n => n.id === id ? { ...n, archived: false } : n)
    );
  };

  const trash = (id) => {
    setNotes(prev =>
      prev.map(n => n.id === id ? { ...n, trashed: true } : n)
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Archived Notes</h1>

      <div className="flex flex-wrap gap-6">
        {notes
          .filter(n => n.archived && !n.trashed)
          .map(note => (
            <NoteCard
              key={note.id}
              note={note}
              mode="archive"
              onRestore={unarchive}
              onTrash={trash}
            />
          ))}
      </div>
    </div>
  );
};

export default Archive;
import NoteCard from "../components/NoteCard";

const Pinned = ({ notes, setNotes }) => {

  const unpin = (id) => {
    setNotes(prev =>
      prev.map(n => n.id === id ? { ...n, pinned: false } : n)
    );
  };

  const archive = (id) => {
    setNotes(prev =>
      prev.map(n =>
        n.id === id ? { ...n, archived: true, pinned: false } : n
      )
    );
  };

  const trash = (id) => {
    setNotes(prev =>
      prev.map(n => n.id === id ? { ...n, trashed: true } : n)
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Pinned Notes</h1>

      <div className="flex flex-wrap gap-6">
        {notes
          .filter(n => n.pinned && !n.archived && !n.trashed)
          .map(note => (
            <NoteCard
              key={note.id}
              note={note}
              mode="pinned"
              onPin={unpin}
              onArchive={archive}
              onTrash={trash}
            />
          ))}
      </div>
    </div>
  );
};

export default Pinned;
import NoteCard from "../components/NoteCard";

const Trash = ({ notes, setNotes }) => {

  const restore = (id) => {
    setNotes(prev =>
      prev.map(n => n.id === id ? { ...n, trashed: false } : n)
    );
  };

  const deleteForever = (id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Trash</h1>

      <div className="flex flex-wrap gap-6">
        {notes
          .filter(n => n.trashed)
          .map(note => (
            <NoteCard
              key={note.id}
              note={note}
              mode="trash"
              onRestore={restore}
              onDeleteForever={deleteForever}
            />
          ))}
      </div>
    </div>
  );
};

export default Trash;
import { FaThumbtack, FaArchive, FaTrash, FaUndo } from "react-icons/fa";

const NoteCard = ({
  note,
  mode = "home",
  onPin,
  onArchive,
  onTrash,
  onRestore,
  onDeleteForever,
  onTagClick,
  onEdit
}) => {
  return (
    <div
      onClick={() => onEdit?.(note)}
      className="bg-white p-4 rounded-xl shadow w-[320px] cursor-pointer"
    >
      <h3 className="font-semibold">{note.title}</h3>
      <p className="text-gray-600 text-sm">{note.description}</p>

      {note.tags?.length > 0 && (
        <div className="flex gap-2 mt-2 flex-wrap">
          {note.tags.map(tag => (
            <span
              key={tag}
              onClick={(e) => {
                e.stopPropagation();
                onTagClick?.(tag);
              }}
              className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-4 text-sm mt-4">
        {mode === "home" && (
          <>
            <button onClick={(e) => { e.stopPropagation(); onPin(note.id); }}>
              <FaThumbtack /> {note.pinned ? "Unpin" : "Pin"}
            </button>
            <button onClick={(e) => { e.stopPropagation(); onArchive(note.id); }}>
              <FaArchive /> Archive
            </button>
            <button onClick={(e) => { e.stopPropagation(); onTrash(note.id); }}>
              <FaTrash /> Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
import { useEffect, useState } from "react";

const NoteModal = ({ note, onAdd, onUpdate, onClose }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setDesc(note.description);
      setTags(note.tags.join(", "));
    } else {
      setTitle("");
      setDesc("");
      setTags("");
    }
  }, [note]);

  const handleSave = () => {
    if (!title) return;

    const data = {
      ...(note || {}),
      id: note?.id || Date.now(),
      title,
      description: desc,
      tags: tags.split(",").map(t => t.trim()).filter(Boolean),
      pinned: note?.pinned || false,
      archived: note?.archived || false,
      trashed: note?.trashed || false
    };

    note ? onUpdate(data) : onAdd(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[400px]">
        <h2 className="font-semibold mb-3">
          {note ? "Edit Note" : "Create Note"}
        </h2>

        <input value={title} onChange={e => setTitle(e.target.value)} />
        <textarea value={desc} onChange={e => setDesc(e.target.value)} />
        <input value={tags} onChange={e => setTags(e.target.value)} />

        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default NoteModal;
import { FiSearch, FiPlus } from "react-icons/fi";

const SearchBar = ({ search, setSearch, onCreate }) => {
  return (
    <div className="flex gap-3 items-center">
      <div className="flex items-center flex-1 bg-white border rounded-lg px-3 shadow-sm">
        <FiSearch className="text-gray-400" />
        <input
          className="w-full p-2 outline-none"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <button
        onClick={onCreate}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        <FiPlus /> Create Note
      </button>
    </div>
  );
};

export default SearchBar;
import React from 'react';
import { FaThumbtack, FaArchive, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const TopStats = ({ notes }) => {
  return (
    <div className="flex gap-6 mt-4 text-gray-600">
      <Link to="/pinned" className="flex items-center gap-2">
        <FaThumbtack /> Pinned ({notes.filter(n => n.pinned && !n.trashed).length})
      </Link>
      <Link to="/archive" className="flex items-center gap-2">
        <FaArchive /> Archived ({notes.filter(n => n.archived).length})
      </Link>
      <Link to="/trash" className="flex items-center gap-2">
        <FaTrash /> Trash ({notes.filter(n => n.trashed).length})
      </Link>
    </div>
  );
};

export default TopStats;
