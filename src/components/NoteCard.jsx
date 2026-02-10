import { FaThumbtack, FaArchive, FaTrash, FaUndo } from "react-icons/fa";

const NoteCard = ({
  note,
  mode = "home",        // home | pinned | archive | trash
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

      {/* TAGS */}
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

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 text-sm mt-4">

        {/* HOME */}
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

        {/* PINNED */}
        {mode === "pinned" && (
          <>
            <button onClick={(e) => { e.stopPropagation(); onPin(note.id); }}>
              <FaThumbtack /> Unpin
            </button>

            <button onClick={(e) => { e.stopPropagation(); onArchive(note.id); }}>
              <FaArchive /> Archive
            </button>

            <button onClick={(e) => { e.stopPropagation(); onTrash(note.id); }}>
              <FaTrash /> Delete
            </button>
          </>
        )}

        {/* ARCHIVE */}
        {mode === "archive" && (
          <>
            <button onClick={(e) => { e.stopPropagation(); onRestore(note.id); }}>
              <FaUndo /> Unarchive
            </button>

            <button onClick={(e) => { e.stopPropagation(); onTrash(note.id); }}>
              <FaTrash /> Delete
            </button>
          </>
        )}

        {/* TRASH */}
        {mode === "trash" && (
          <>
            <button onClick={(e) => { e.stopPropagation(); onRestore(note.id); }}>
              <FaUndo /> Restore
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); onDeleteForever(note.id); }}
            >
              <FaTrash /> Delete Forever
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NoteCard;
