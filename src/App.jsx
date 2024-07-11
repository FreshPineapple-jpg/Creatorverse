import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddCreator from './pages/AddCreator';
import EditCreator from './pages/EditCreator';
import ShowCreator from './pages/ShowCreator';
import ViewCreator from './pages/ViewCreator';
import Nav from './components/Nav';
import './App.css';
import './font.css';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<ShowCreator />} />
        <Route path="/add" element={<AddCreator />} />
        <Route path="/view/:slug" element={<ViewCreator />} />
        <Route path="/edit/:slug" element={<EditCreator />} />
      </Routes>
    </Router>
  );
}

export default App;
