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
