import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

window.onload = function() {
  const input = document.querySelector("#inputbox");
  input.focus();
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
