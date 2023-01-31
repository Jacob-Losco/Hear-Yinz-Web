/*+===================================================================
File: FirebaseLogin.js

Summary: A simple set login form that checks to make sure authentication of user login and sign out is functional

Exported Data Structures: None

Exported Functions: FirebaseLogin - returns the html to build the login form

Contributors:
	Jacob Losco - 01/24/23 - SP-341

===================================================================+*/

import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { oAuthentication } from "./firebase-config";
import "@fontsource/dm-sans";
import './font.css';
import './Login.css';
/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: fnFirebaseLogin

  Summary: returns the html to build the sample login form

  Args: None

  Returns: html
    the html to make login form
-------------------------------------------------------------------F*/
function FirebaseLogin() {
    const [sLoginEmail, fnSetLoginEmail] = useState("");
    const [sLoginPassword, fnSetLoginPassword] = useState("");
    const [oUser, setUser] = useState({});

    useEffect(() => {
        onAuthStateChanged(oAuthentication, (oCurrentUser) => {
            setUser(oCurrentUser);
        });
    });

    /*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Function: fnLogin

    Summary: authenticates user from firebase authentication based on current set email and password, or rejects them and prints an error message

    Args: None

    Returns: None
  -------------------------------------------------------------------F*/
    const fnLogin = async () => {
        try {
            const oUser = await signInWithEmailAndPassword(
                oAuthentication, 
                sLoginEmail, 
                sLoginPassword
            )
        } catch (error) {
            console.log(error.message);
        }
    }

    /*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Function: fnLogout

    Summary: signs out a currently signed in user.

    Args: None

    Returns: None
  -------------------------------------------------------------------F*/
    /*const fnLogout = async () => {
        await signOut(oAuthentication);
    };*/
    /*      <button onClick={fnLogout}> Sign Out </button>*/

  return <div className="FirebaseLogin" >
    <div className='container'>
      <h2> Hear Yinz! </h2>
      <h1> Admin Dashboard </h1>
      <div>
        <div><b>Email</b></div>
        <input className = "inpt" placeholder="Email" onChange={(event) => {
          fnSetLoginEmail(event.target.value);
        }} />
      </div>
      <br></br>
      <div>
        <div><b>Password</b></div>
        <input className = "inpt" placeholder="Password" onChange={(event) => {
          fnSetLoginPassword(event.target.value);
        }} />
      </div>
      <br></br>
      <br></br>
      <button className = 'btn' onClick={fnLogin}>Log in</button>
      </div>
  </div>
}

export default FirebaseLogin;