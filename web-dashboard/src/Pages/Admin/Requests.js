/*+===================================================================
File: Requests.js

Summary: Container page that routes Requests sub navigation and displays sub navbar.

Exported Data Structures: None

Exported Functions: Requests

Contributors:
    Philip Pavlick - 02/18/23 - SP-312

===================================================================+*/


import React from 'react';
import {Routes, Route, NavLink} from 'react-router-dom'
import AdminEvents from './AdminEvents';
import AdminAnnouncement from './AdminAnnouncement';
import AdminOfficer from './AdminOfficer';
import '../../Styles/font.css';
import '../../Styles/Requests.css'

const Requests = ({triggerRequestsRemoveUpdate}) => {
    return(
        <div className="Requests">
            <div className='RequestNavigation'>
                <NavLink to="Events"> Events</NavLink>
                <NavLink to="Announcements"> Announcements</NavLink>
                <NavLink to="Officers"> Officer</NavLink>
            </div>

            <Routes>
                <Route path='/Events' element={<AdminEvents triggerRequestsRemoveUpdate={triggerRequestsRemoveUpdate}/>} />
                <Route path='/Announcements' element={<AdminAnnouncement triggerRequestsRemoveUpdate={triggerRequestsRemoveUpdate}/>} />
                <Route path='/Officers' element={<AdminOfficer triggerRequestsRemoveUpdate={triggerRequestsRemoveUpdate}/>}/>
            </Routes>

        </div>
        
    );
}

export default Requests;