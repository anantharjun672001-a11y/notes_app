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
