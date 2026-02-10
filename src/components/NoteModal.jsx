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
