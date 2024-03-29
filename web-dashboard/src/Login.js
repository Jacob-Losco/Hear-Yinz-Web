/*+===================================================================
File: App.js

Summary: A set of controls that hosts ands wraps the NavBar with the BrowserRouter component for the Hear-Yinz application.

Exported Data Structures: None

Exported Functions: App

Contributors:
	Jacob Losco - 01/24/23 - SP-341

===================================================================+*/

import React, { useState } from 'react';
import '@fontsource/dm-sans';
import './Styles/font.css';
import './Styles/Login.css';
import { fnLogin } from "./LoginFunctions";

function Login() {
  const [sLoginEmail, fnSetLoginEmail] = useState("");
  const [sLoginPassword, fnSetLoginPassword] = useState("");

  /*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Function: fnHandleLogin
  
    Summary: authenticates user from firebase authentication based on current set email and password, or rejects them and prints an error message
  
    Args: None
  
    Returns: None
  -------------------------------------------------------------------F*/
  const fnHandleLogin = async () => {
    const error = await fnLogin(sLoginEmail, sLoginPassword);
    if(error) {
      console.log(error.message);
      const Message = document.getElementById('Message');
      Message.innerHTML = "Invalid email, please enter an associated email or contact administration!";
    }
  }
  
  return <div >
    <div className='container'>
      <h2> Hear Yinz! </h2>
      <h1> Admin Dashboard </h1>
      <div>
        <div className='bld'>Email</div>
        <input className = "inpt" placeholder='Email' onChange={(event) => {
        fnSetLoginEmail(event.target.value);
      }} />
      </div>
      <br></br>
      <div>
        <div className='bld' >Password</div>
        <input type="password" className = "inpt" placeholder='Password' onChange={(event) => {
        fnSetLoginPassword(event.target.value);
      }} />
      </div>
      <br></br>
      <br></br>
      <button className = 'btn' onClick={fnHandleLogin} >Log in</button>
      <p id ='Message'></p>
      </div>
  </div> 
}
export default Login;