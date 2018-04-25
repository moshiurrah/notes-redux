import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import MainNotes from './components/MainNotes';
import { BrowserRouter } from 'react-router-dom'
//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <BrowserRouter>
    <MainNotes />
  </BrowserRouter>), document.getElementById('root'));
//registerServiceWorker();
