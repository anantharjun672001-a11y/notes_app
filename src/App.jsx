import React from 'react';
import { BrowserRouter,  Route,  Routes } from 'react-router-dom';
import Home from './pages/Home';
import Archive from './pages/Archive';
import Trash from './pages/Trash';

const App = () => {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/archive' element={<Archive/>}/>
            <Route path='/trash' element={<Trash/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
};

export default App;