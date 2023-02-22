/*+===================================================================
File: OrganizationsPage.js

Summary: Hosts content for Organizations page.

Exported Data Structures: None

Exported Functions: OrgPage 

Contributors:
	
  Sam Merlin - 02/21/23 - SP 269
===================================================================+*/
import React from 'react';
import {NavLink, Route, Routes, useLocation} from 'react-router-dom'
import OrgE from './OrgE';
import OrgAnn from './OrgAnn';
import OrgAU from './OrgAU';
import OrgOff from './OrgOff';
import './OrgList.css'

export default function OrgPage() {
    const location = useLocation()
    const { name } = location.state
    return(
        <div>
           <div className='OrgNameHeader'>{name}</div>
            <div className='OrgNavigation'>
                <NavLink to="AboutUs" state={{name:name}}> About Us</NavLink>
                <NavLink to="Events" state={{name:name}}> Events</NavLink>
                <NavLink to="Announcements" state={{name:name}}> Announcements</NavLink>
                <NavLink to="Officers" state={{name:name}}> Officer</NavLink>
            </div>
            <div>
                <Routes>
                    <Route path='/Events' element={<OrgE/>} />
                    <Route path='/AboutUs' element={<OrgAU/>} />
                    <Route path='/Announcements' element={<OrgAnn/>} />
                    <Route path='/Officers' element={<OrgOff/>}/>
                </Routes>
              </div>
        </div>
    );
}