import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { createRoot } from 'react-dom/client';  
const root = document.getElementById('root');

// Correct usage of createRoot
const rootElement = createRoot(root); 
rootElement.render(
  <Router>
    <App />
  </Router>
);
