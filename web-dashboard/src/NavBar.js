/*+===================================================================
File: NavBar.js

  Summary: Creates the navigation bar routes and links. 
  Checks the status of the user and returns nav bar functionality to the nav bar according to the users role.

  Exported Data Structures: None

  Exported Functions: NavBar

  Contributors:
	  Philip Pavlick - 02/2/23 - SP-263
    Philip Pavlick - 02/16/23 - SP-435,447
===================================================================+*/

import React from 'react';
import {Routes, Route,NavLink, useNavigate} from 'react-router-dom'
  import { useEffect, useState } from 'react';  
  import { onAuthStateChanged } from 'firebase/auth';
  import {oAuthentication} from './firebase-config';
  import Requests from './Pages/Requests'
  import AdminEvents from './Pages/AdminEvents'
  import Organizations from './Pages/Organizations';
  import Reports from './Pages/Reports';
  import Login from './Login';
  import './font.css';
  import './NavBar.css';
  import logo from './Recources/HearYinzLogo.png'
  import { fnGetUserRole } from './DBFunctions';
  import { fnGetEventReports, fnGetEventRequests, fnGetOfficerRequests, fnGetAnnouncementRequests } from './DBFunctions'
  import { fnLogout } from './LoginFunctions';
  
  function NavBar() {
    const [iCountReports, setiCountReports] = useState(0);
    const [iCountRequests, setiCountRequests] = useState(0);
    const [iUserRole, setUserRole] = useState(-1);

    const navigate = useNavigate();

    /*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Function: fnHandleLogout
  
    Summary: logouts out a user using associated Auth Function
  
    Args: None
  
    Returns: None
  -------------------------------------------------------------------F*/
    const fnHandleLogout = async () => {
      const error = await fnLogout();
    }

    useEffect(() => {
      const fnDisplayReports = async () => {
          let oReports = await fnGetEventReports();
          setiCountReports(oReports.length);
      }

      const fnDisplayRequests = async () => {
        let oRequests = await fnGetEventRequests();
        let oOfficers = await fnGetOfficerRequests();
        let oEvents = await fnGetAnnouncementRequests();
        setiCountRequests(oRequests.length + oOfficers.length + oEvents.length);
    }

      const fnSetUserRole = async () => {
        setUserRole(await fnGetUserRole());
      }

      onAuthStateChanged(oAuthentication, (oCurrentUser) => {          
        if(oCurrentUser != null) {
          fnSetUserRole();
          fnDisplayReports();
          fnDisplayRequests();
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
                <div className='RequestNotification'>{iCountRequests}</div>
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
                <Route path="/Requests/*" element={<Requests /> }/>
                <Route path="/Reports" element={<Reports />} />
              </Routes>
        </div>

    );
  }
  
  export default NavBar;
