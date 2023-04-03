import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const tasks = [
  { id: 1, name: 'Eat', completed: true },
  { id: 2, name: 'Sleep', completed: false },
  { id: 3, name: 'Repeat', completed: false },
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App tasks={tasks} />
  </React.StrictMode>
);
