import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeDetail from './pages/HomeDetail'; 
import EachDetail from './pages/EachDetail'; 
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeDetail />} /> 
      <Route path="/posts/:postId" element={<EachDetail />} />
    </Routes>
  );
}

export default App;
