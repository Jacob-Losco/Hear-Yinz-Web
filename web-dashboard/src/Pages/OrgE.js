import React from 'react';
import {NavLink, Route, Routes} from 'react-router-dom'
import OrgE from './OrgE';
import OrgAnn from './OrgAnn';
import OrgAU from './OrgAU';
import OrgOff from './OrgOff';
import './OrgList.css'

export default function Events() {
    return(
        <div className="Requests">
            <div className='SubNavBar'>
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