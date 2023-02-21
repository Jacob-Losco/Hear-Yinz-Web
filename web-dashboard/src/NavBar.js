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
  import { useEffect, useState } from 'react';  
  import { onAuthStateChanged } from 'firebase/auth';
  import {oAuthentication} from './firebase-config';
  import Requests from './Pages/Requests'
  import Organizations from './Pages/Organizations';
  import Reports from './Pages/Reports';
  import Login from './Login';
  import OrgE from './Pages/OrgE';
  import './font.css';
  import './NavBar.css';
  import logo from './Recources/HearYinzLogo.png'
  import { fnGetUserRole } from './DBFunctions';
  import { fnGetEventReports } from './DBFunctions'
  import { fnLogout } from './LoginFunctions';
  
  function NavBar() {
    const [iCountReports, setiCountReports] = useState(0);
    const [iUserRole, setUserRole] = useState(-1);

    const navigate = useNavigate();

    const fnHandleLogout = async () => {
      const error = await fnLogout();
    }

    useEffect(() => {
      const fnDisplayReports = async () => {
          let oReports = await fnGetEventReports();
          setiCountReports(oReports.length);
      }

      const fnSetUserRole = async () => {
        setUserRole(await fnGetUserRole());
      }

      onAuthStateChanged(oAuthentication, (oCurrentUser) => {          
        if(oCurrentUser != null) {
          fnSetUserRole();
          fnDisplayReports();
          navigate("/Organizations");
        } else {
          fnSetUserRole();
          navigate("/");
        }
      });
    },[]);

    return (
        <div className='PageContainer'>
        <div className='leftNavbar'>
          <div className='icon'>
          <img src={logo} width={50} height={50} />
          </div>
          <nav>
          {iUserRole > -1 ? (
            <div className='Organizations'>
              <NavLink to="Organizations" > Organizations</NavLink>
            </div>
          ) : (
            <div />
          )}
          {iUserRole > 1 ? (
              <div className='Requests'>
                <NavLink to="Requests" >Requests</NavLink>
              </div>
          ) : (
            <div />
          )} 
          {iUserRole > 1 ? (
            <div className='Reports'>
              <NavLink to="Reports" >Reports</NavLink>
              <div className='notification'>{iCountReports}</div>
            </div>
          ) : (
            <div />
          )} 
          
          </nav>
          <div className='rightNavbar'>
              <button className="logoutButton" onClick={fnHandleLogout} >Logout </button>
          </div>
        </div>
              <Routes>
                <Route path='/' element={<Login />}/>
                <Route path="/Organizations" element={<Organizations /> }/>
                <Route path="Organizations/Events/*" element={<OrgE /> }/>
                <Route path="/Requests" element={<Requests /> }/>
                <Route path="/Reports" element={<Reports />} />s
              </Routes>
        </div>

    );
  }
  
  export default NavBar;
