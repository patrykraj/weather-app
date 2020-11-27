import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const nav = document.getElementsByTagName('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    nav[0].classList.add('shade');
  } else {
    nav[0].classList.remove('shade');
  }
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
