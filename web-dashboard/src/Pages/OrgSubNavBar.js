/*+===================================================================
File: OrgSubNavBar.js
Summary: Creates the NavBar function by using router components. 
Checks the status of the uses and navigates valid users to the Organizations page where they can navigate
to about us, events, announcements, and officers.
Exported Data Structures: None
Exported Functions: SubNavBar
Contributors:
	Sam Merlin 2/15/2023 - SP-263
===================================================================+*/
import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    NavLink,
    useNavigate
  } from 'react-router-dom'
  import Organizations from './Organizations';
  import OrgEventsPage from './OrgEventsPage';
  import OrgAnnouncements from './OrgAnnouncements';
  import OrgOfficersList from './OrgOfficersList';
  import OrgAboutUs from './OrgAboutUs';
  import './OrgList.css';

  export default function SubNavBar() {
 
    return (
        <div>
            <div>
                <NavLink to="OrgAboutUs" > About Us</NavLink>
            </div>
            <div>
                <NavLink to="OrgEventsPage" >Events</NavLink>
            </div>
            <div>
                <NavLink to="OrgAnnouncements" >Announcements</NavLink>
            </div>
            <div>
                <NavLink to="OrgOfficersList" >Officers</NavLink>
            </div>
            <div>
            <Routes>
                    <Route path='/' element={<Organizations />}/>
                    <Route path="/OrgEventsPage" element={<OrgEventsPage /> }/>
                    <Route path="/OrgAnnouncements" element={<OrgAnnouncements /> }/>
                    <Route path="/OrgOfficersList" element={<OrgOfficersList />} />
                    <Route path="/OrgAboutUs" element={<OrgAboutUs />} />
                </Routes>
            </div>
        </div>
        )
    }
