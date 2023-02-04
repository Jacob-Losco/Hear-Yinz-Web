/*+===================================================================
File: App.js

Summary: A set of controls that hosts ands wraps the NavBar with the BrowserRouter component for the Hear-Yinz application.

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

  Summary: Hosts webpage content and components. Returns the NavBar component.

  Args: None

  Returns: BrowserRouter and NavBar component
-------------------------------------------------------------------F*/
function App() {

  return (
    <BrowserRouter>
      <NavBar></NavBar>
    </BrowserRouter>
    
  );
}

export default App;
