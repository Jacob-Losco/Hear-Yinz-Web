/*+===================================================================
File: index.js

Summary: index.js is the root element for the Hear-Yinz web applications. index.js retrieves and displays the other functions on screen.

Exported Data Structures: None

Exported Functions: None

Contributors:
	Philip Pavlick - 02/2/23 - SP-263

===================================================================+*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: root

  Summary: 

  Args: None

  Returns: html
    the html to make display
-------------------------------------------------------------------F*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='Container'>
    <React.StrictMode>
      <App></App>
    </React.StrictMode>
  </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
