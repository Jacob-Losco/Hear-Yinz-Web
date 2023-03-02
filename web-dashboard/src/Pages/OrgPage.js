/*+===================================================================
File: OrgPage.js

Summary: the organizations page, navigtion through org list, holds the information of the organization

Exported Data Structures: None

Exported Functions: OrgPage(props)

Contributors:
    Sam Merlin 2/21/2023 - SP 269 SP-272-271

===================================================================+*/
import React from 'react';
import {NavLink, Route, Routes, useLocation} from 'react-router-dom'
import OrgE from './OrgE';
import AddEventForm from './EventForm';
import OrganizationAnnouncementsForm from './OrgAnnouncementsForm'
import OrganizationAboutUsForm from './OrganizationAboutUsForm';
import OrgOff from './OrgOff';
import './OrgList.css'

export default function OrgPage(props) {
    const location = useLocation()
    const OrgInfo = location.state.data;
    console.log(OrgInfo);
    return(
        <div>
           <div className='OrgNameHeader'>{OrgInfo.name}</div>
            <div className='OrgNavigation'>
                <NavLink to="AboutUs" state={{data:OrgInfo}}> About Us</NavLink>
                <NavLink to="Events" state={{data:OrgInfo}}> Events</NavLink>
                <NavLink to="Announcements" state={{data:OrgInfo}}> Announcements</NavLink>
                <NavLink to="Officers" state={{data:OrgInfo}}> Officer</NavLink>
            </div>

            <div>
                <Routes>
                    <Route path='/Events' element={<OrgE/>} />
                    <Route path='Events/AddEventForm' element={<AddEventForm />} />
                    <Route path='/Announcements' element={<OrganizationAnnouncementsForm/>} />
                    <Route path='/AboutUs' element={<OrganizationAboutUsForm/>} />
                    <Route path='/Officers' element={<OrgOff/>}/>
                </Routes>
            </div>
        </div>
    );
}