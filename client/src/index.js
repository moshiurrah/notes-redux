import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import Notes from './components/Notes';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Notes/>, document.getElementById('root'));
registerServiceWorker();
