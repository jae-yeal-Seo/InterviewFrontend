import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TopBar from './layouts/TopBar'
import reportWebVitals from './reportWebVitals';


const topbar = ReactDOM.createRoot(document.getElementById('topbar'));
topbar.render(
  <React.StrictMode>
    <TopBar />
  </React.StrictMode>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
