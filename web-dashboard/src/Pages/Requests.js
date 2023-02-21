/*+===================================================================
File: Requests.js

Summary: Container page that routes Requests sub navigation and displays sub navbar.

Exported Data Structures: None

Exported Functions: Requests

Contributors:
	Philip Pavlick - 02/2/23 - SP-263
    Philip Pavlick - 02/18/23 - SP-312

===================================================================+*/


import React from 'react';
import {Routes, Route,NavLink, useNavigate} from 'react-router-dom'
import AdminEvents from './AdminEvents';
import AdminAnnouncement from './AdminAnnouncement';
import AdminOfficer from './AdminOfficer';

import '../font.css';
import './Requests.css'


export default function Requests() {
    return(
        <div className="Requests">
            <div className='RequestNavigation'>
                <NavLink to="Events"> Events</NavLink>
                <NavLink to="Announcements"> Announcements</NavLink>
                <NavLink to="Officers"> Officer</NavLink>
            </div>

            <Routes>
                
                <Route path='/Events' element={<AdminEvents/>} />
                <Route path='/Announcements' element={<AdminAnnouncement/>} />
                <Route path='/Officers' element={<AdminOfficer/>}/>
            </Routes>

        </div>
        
    );
}