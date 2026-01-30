import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';

console.log("Starting React mount...");

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Could not find root element to mount to");
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

console.log("Mount triggered.");