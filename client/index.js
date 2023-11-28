import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import CreatePage from './components/CreatePage.jsx';
// import './scss/_app.scss';
// import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));
root.render(<App />);
