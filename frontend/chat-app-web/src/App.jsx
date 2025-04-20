import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatController from './components/ChatController';
import Home from './components/Home';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatController />} />
      </Routes>
    </Router>
  );
}

export default App;