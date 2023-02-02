
import React from "react";
import "@fontsource/dm-sans";
import './font.css';
import './Login.css';

function Login() {
      return <div className="FirebaseLogin" >
    <div className='container'>
      <h2> Hear Yinz! </h2>
      <h1> Admin Dashboard </h1>
      <div>
        <div><b>Email</b></div>
        <input className = "inpt" placeholder="Email"/>
      </div>
      <br></br>
      <div>
        <div><b>Password</b></div>
        <input className = "inpt" placeholder="Password"/>
      </div>
      <br></br>
      <br></br>
      <button className = 'btn'>Log in</button>
      </div>
  </div>
}

export default Login;