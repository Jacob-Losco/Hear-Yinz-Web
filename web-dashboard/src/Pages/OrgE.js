import React from 'react';
import {Routes, Route,NavLink, useNavigate} from 'react-router-dom'
import OrgAnn from './OrgAnn';
import OrgAU from './OrgAU';
import OrgE from './OrgE';
import OrgOff from './OrgOff';

export default function Events() {
    return(
        <div className="Requests">
            <div className='OrgSubNavigation'>
                
                <NavLink to="AboutUs"> About Us</NavLink>
                <NavLink to="Events"> Events</NavLink>
                <NavLink to="Announcements"> Announcements</NavLink>
                <NavLink to="Officers"> Officer</NavLink>
            </div>

            <Routes>
                
                <Route path='/AboutUs' element={<OrgAU/>} />
                <Route path='/Events' element={<OrgE/>} />
                <Route path='/Announcements' element={<OrgAnn/>} />
                <Route path='/Officers' element={<OrgOff/>}/>
            </Routes>

        </div>
        
    );
}


<Routes>
                <Route path='/' element={<Login />}/>
                <Route path="/Organizations" element={<Organizations /> }/>
                <Route path="/Requests/*" element={<Requests /> }/>
                <Route path="/Reports" element={<Reports />} />
              </Routes>