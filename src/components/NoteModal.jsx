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
    if (!title.trim()) return;

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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[400px] shadow-xl space-y-4">

        <h2 className="text-lg font-semibold">
          {note ? "Edit Note" : "Create Note"}
        </h2>

        {/* TITLE */}
        <div>
          <label className="block text-sm mb-1 font-medium">
            Title
          </label>
          <input
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter note title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm mb-1 font-medium">
            Description
          </label>
          <textarea
            className="w-full border rounded px-3 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write your note..."
            value={desc}
            onChange={e => setDesc(e.target.value)}
          />
        </div>

        {/* TAGS */}
        <div>
          <label className="block text-sm mb-1 font-medium">
            Tags
          </label>
          <input
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Add tags (comma separated)"
            value={tags}
            onChange={e => setTags(e.target.value)}
          />
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-blue-600 text-white"
          >
            {note ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
