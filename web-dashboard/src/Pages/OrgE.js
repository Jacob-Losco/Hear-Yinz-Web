import React from 'react';
import {NavLink} from 'react-router-dom'
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
        </div>
    );
}