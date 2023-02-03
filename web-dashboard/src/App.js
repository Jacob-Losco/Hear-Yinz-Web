/*+===================================================================
File: App.js

Summary: A simple set of controls that test the multiple different data retrievals and postings for the Hear-Yinz web application

Exported Data Structures: None

Exported Functions: App

Contributors:
	Jacob Losco - 01/24/23 - SP-341

===================================================================+*/

import React from "react";
import NavBar from "./NavBar";
import {  BrowserRouter } from 'react-router-dom'
/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: App

  Summary: returns the html and buttons associated with testing interacting with firestore

  Args: None

  Returns: html
    the html to make display
-------------------------------------------------------------------F*/
function App() {

  return (
    <BrowserRouter>
      <NavBar></NavBar>
    </BrowserRouter>
    
  );
}

export default App;
