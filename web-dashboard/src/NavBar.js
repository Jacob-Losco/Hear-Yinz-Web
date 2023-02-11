/*+===================================================================
File: NavBar.js
Summary: Creates the NavBar function by using router components. 
Checks the status of the uses and navigates valid users to the Organizations page where they can navigate
to the Reports page, the Requests page and Logout page.
Exported Data Structures: None
Exported Functions: NavBar
Contributors:
	Philip Pavlick - 02/2/23 - SP-263
===================================================================+*/

import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    NavLink,
    useNavigate
  } from 'react-router-dom'
  import { useEffect } from 'react';  
  import { onAuthStateChanged, signOut } from 'firebase/auth';
  import {oAuthentication} from './firebase-config';

  import Requests from './Pages/Requests'
  import Organizations from './Pages/Organizations';
  import Reports from './Pages/Reports';
  import Login from './Login';
  import './font.css';
  import './NavBar.css';
  import logo from './Recources/HearYinzLogo.png'

  
  /*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: NavBar
  Summary: Creates the routes to pages, creates the link button on the navbar, and creates the logo on the navbar.
  Args: 
  Returns: The routes to pages and the html to create Navlinks
-------------------------------------------------------------------F*/


  function NavBar() {


/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  Function: navigate
  Summary: checks the oCurrentUser oAuthentication and navigates the page accordingly.
  Args: 
  Returns:
-------------------------------------------------------------------F*/

    const navigate = useNavigate();
    useEffect(() =>{
        onAuthStateChanged(oAuthentication, (oCurrentUser) => {
            if(oCurrentUser != null) {
                navigate("/Organizations");
            }
            else {
              navigate("/");
            }
        });
    }, []);

    const fnLogout = async () => {
      await signOut(oAuthentication);
    };

    return (
        <div className='PageContainer'>
        <div className='leftNavbar'>
          <div className='icon'>
          <img src={logo} width={50} height={50} />
          </div>
          <nav>
              <div className='Organizations'>
                <NavLink to="Organizations" > Organizations</NavLink>
              </div>
              <div className='Requests'>
                <NavLink to="Requests" >Requests</NavLink>
              </div>
              <div className='Reports'>
                <NavLink to="Reports" >Reports</NavLink>
                <div className='notification'>5</div>
              </div>
          </nav>
          <div className='rightNavbar'>
              <button className="logoutButton" onClick={fnLogout} >Logout </button>
          </div>
        </div>
              <Routes>
                <Route path='/' element={<Login />}/>
                <Route path="/Organizations" element={<Organizations /> }/>
                <Route path="/Requests" element={<Requests /> }/>
                <Route path="/Reports" element={<Reports />} />s
              </Routes>
        </div>

    );
  }
  
  export default NavBar;
