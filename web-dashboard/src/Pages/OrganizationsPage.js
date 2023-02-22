/*+===================================================================
File: OrganizationsPage.js

Summary: Hosts content for Organizations page.

Exported Data Structures: None

Exported Functions: OrgPage 

Contributors:
	
  Sam Merlin - 02/21/23 - SP 269
===================================================================+*/
import React from 'react';
import {NavLink, Route, Routes} from 'react-router-dom'
import OrgE from './OrgE';
import OrgAnn from './OrgAnn';
import OrgAU from './OrgAU';
import OrgOff from './OrgOff';
import './OrgList.css'

export default function OrgPage() {
    return(
        <div>
            <div className='OrgNavigation'>
                <NavLink to="AboutUs"> About Us</NavLink>
                <NavLink to="Events"> Events</NavLink>
                <NavLink to="Announcements"> Announcements</NavLink>
                <NavLink to="Officers"> Officer</NavLink>
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