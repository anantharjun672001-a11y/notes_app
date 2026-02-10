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
