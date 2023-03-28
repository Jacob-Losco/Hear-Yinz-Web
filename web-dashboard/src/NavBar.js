/*+===================================================================
File: NavBar.js

  Summary: Creates the navigation bar routes and links. 
  Checks the status of the user and returns nav bar functionality to the nav bar according to the users role.

  Exported Data Structures: None

  Exported Functions: NavBar

  Contributors:
    Jacob Losco - 3/18/23 - SP-497
    Philip Pavlick - 02/16/23 - SP-447
===================================================================+*/

import React from 'react';
import { NavLink, Routes, Route, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react';  
import { onAuthStateChanged } from 'firebase/auth';
import { oAuthentication } from './firebase-config';
import Requests from './Pages/Admin/Requests'
import Organizations from './Pages/Organization/Organizations';
import OrgPage from './Pages/Organization/OrgPage';
import Reports from './Pages/Admin/Reports';
import ReportsExpand from './Pages/Admin/ReportsExpand'
import Login from './Login';
import './Styles/font.css';
import './Styles/NavBar.css';
import logo from './Recources/HearYinzLogo.png'
import { fnGetUserRole } from './DBFunctions';
import { fnGetAnnouncementRequests, fnGetEventReports, fnGetEventRequests, fnGetOfficerRequests } from './DBFunctions'
import { fnLogout } from './LoginFunctions';
  
  const NavBar = () => {
    const [iCountReports, setiCountReports] = useState(0);
    const [iCountRequests, setiCountRequests] = useState(0);
    const [bCountRequestsLoaded, setCountRequestsLoaded] = useState(false);
    const [bCountReportsLoaded, setCountReportsLoaded] = useState(false);
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
      setCountReportsLoaded(false);
      setCountRequestsLoaded(false);
    }

    const fnRemoveReport = async () => {
      setiCountReports(iCountReports - 1);
    }

    const fnAddRequest = async () => {
      setiCountRequests(iCountRequests + 1);
    }

    const fnRemoveRequest = async () => {
      console.log("Hello");
      setiCountRequests(iCountRequests - 1);
    }

    useEffect(() => {
      /*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Function: fnDisplayReports
  
      Summary: gets reports from database function and sets component state with value
  
      Args: None
  
      Returns: None
      -------------------------------------------------------------------F*/
      const fnDisplayReports = async () => {
          let oReports = await fnGetEventReports();
          setiCountReports(oReports.length);
          setCountReportsLoaded(true);
      }

      /*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Function: fnDisplayRequests
  
      Summary: gets requests from database function and sets component state with value
  
      Args: None
  
      Returns: None
      -------------------------------------------------------------------F*/
      const fnDisplayRequests = async () => {
        let oEvents = await fnGetEventRequests();
        let oOfficers = await fnGetOfficerRequests();
        let oAnnoucements = await fnGetAnnouncementRequests();
        setiCountRequests(oEvents.length + oOfficers.length + oAnnoucements.length);
        setCountRequestsLoaded(true);
      }

      /*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Function: fnSetUserRole
  
      Summary: gets user role from database function and sets component state with value
  
      Args: None
  
      Returns: None
      -------------------------------------------------------------------F*/
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
            <div className='Organizations navContainer'>
              <NavLink to="Organizations" > Organizations</NavLink>
            </div>
          ) : (
            <div />
          )}
          {iUserRole > 1 ? (
              <div className='Requests navContainer'>
                <NavLink to="Requests/Events" >Requests</NavLink>
                {bCountRequestsLoaded ? (
                  <div className='RequestNotification'>{iCountRequests}</div>
                ) : (
                  <div />
                )}   
              </div>
          ) : (
            <div />
          )} 
          {iUserRole > 1 ? (
            <div className='Reports navContainer'>
              <NavLink to="Reports" >Reports</NavLink>
              {bCountReportsLoaded ? (
                  <div className='notification'>{iCountReports}</div>
                ) : (
                  <div />
                )} 
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
                <Route path="Organizations/OrgPage/*" element={<OrgPage triggerRequestsAddUpdate={fnAddRequest}/> }/>
                <Route path="/Requests/*" element={<Requests triggerRequestsRemoveUpdate={fnRemoveRequest}/> }/>
                <Route path="/Reports" element={<Reports/>} />
                <Route path="/Reports/ReportsExpand" element={<ReportsExpand triggerReportsRemoveUpdate={fnRemoveReport}/>} />
              </Routes>
        </div>

    );
  }
  
  export default NavBar;
