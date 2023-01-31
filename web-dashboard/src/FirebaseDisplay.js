/*+===================================================================
File: FirebaseDisplay.js

Summary: A simple set of controls that test the multiple different data retrievals and postings for the Hear-Yinz web application

Exported Data Structures: None

Exported Functions: FirebaseDisplay

Contributors:
	Jacob Losco - 01/24/23 - SP-341

===================================================================+*/

import React from "react";
import FirebaseLogin from "./Login"

/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: FirebaseDisplay

  Summary: returns the html and buttons associated with testing interacting with firestore

  Args: None

  Returns: html
    the html to make display
-------------------------------------------------------------------F*/
function FirebaseDisplay() {
  return (
    <FirebaseLogin />
  )
}

export default FirebaseDisplay;
