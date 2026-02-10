import React from 'react';

const NoteCard = ({
  note,
  onPin,
  onArchive,
  onTrash,
  onTagClick
}) => {
  return (
    <div className={`note-card ${note.pinned ? "pinned" : ""}`}>
      <h3>{note.title}</h3>
      <p>{note.description}</p>

      <div className="tags">
        {note.tags?.map(tag => (
          <span
            key={tag}
            className="tag"
            onClick={() => onTagClick(tag)}
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="actions">
        <button onClick={() => onPin(note.id)}>
          {note.pinned ? "Unpin" : "Pin"}
        </button>
        <button onClick={() => onArchive(note.id)}>
          Archive
        </button>
        <button onClick={() => onTrash(note.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
