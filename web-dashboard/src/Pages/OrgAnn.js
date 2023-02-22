/*+===================================================================
File: OrgAnn.js

Summary: A holder page for the organization announcements page

Exported Data Structures: None

Exported Functions: Announcements

Contributors:
    Sam Merlin 2/21/2023 - SP 269

===================================================================+*/
import React from 'react';
import {useLocation} from 'react-router-dom'
export default function Announcements() {
    const location = useLocation()
    const { name } = location.state
    return(
        <div>
            <h>Welcome Announcements</h>
            <p>Sample test from Announcements page.</p>
        </div>
    );
}