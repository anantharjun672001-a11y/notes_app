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
