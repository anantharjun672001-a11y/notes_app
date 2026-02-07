import React, { useEffect, useState } from 'react';
import { BrowserRouter,  Route,  Routes } from 'react-router-dom';
import Home from './pages/Home';
import Archive from './pages/Archive';
import Trash from './pages/Trash';

const App = () => {
  const [notes,setNotes]=useState([]);

  useEffect(()=>{
    const storedNotes = localStorage.getItem("notes");
    if(storedNotes){
      setNotes(JSON.parse(storedNotes));
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("notes",JSON.stringify(notes));
  },[notes])

  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home notes={notes} setNotes={setNotes}/>}/>
            <Route path='/archive' element={<Archive/>}/>
            <Route path='/trash' element={<Trash  notes={notes} setNotes={setNotes}/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
};

export default App;
