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
