/*+===================================================================
File: FirebaseDisplay.js

Summary: A simple set of controls that test the multiple different data retrievals and postings for the Hear-Yinz web application

Exported Data Structures: None

Exported Functions: FirebaseDisplay

Contributors:
	Jacob Losco - 01/29/23 - SP-315

===================================================================+*/

import React, { Component, useState, useEffect } from "react";
import { db } from "./firebase-config";
import { collection, getDocs } from 'firebase/firestore'

/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: FirebaseDisplay

  Summary: returns the html and buttons associated with interacting with firestore

  Args: None

  Returns: html
            the html to make display
-------------------------------------------------------------------F*/
function FirebaseDisplay() {
  const [aUsers, setUsers] = useState([]);
  const aUsersCollectionRef = collection(db, "Test_Connect");

  useEffect(() => {
    const fnGetUsers = async () => {
      const data = await getDocs(aUsersCollectionRef);
      console.log(data.docs[0].data().test);
    }

    fnGetUsers();
  }, [])

  return <div className="FirebaseDisplay"></div>
}

export default FirebaseDisplay;
