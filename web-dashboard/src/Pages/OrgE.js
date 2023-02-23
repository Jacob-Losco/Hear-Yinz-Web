/*+===================================================================
File: OrgAnn.js

Summary: A holder page for the organization Events page

Exported Data Structures: None

Exported Functions: Events

Contributors:
    Sam Merlin 2/21/2023 - SP 269

===================================================================+*/
import React from 'react';
import {useLocation} from 'react-router-dom'
export default function Events() {
    const location = useLocation()
    const data = location.state.data;
    return(
        <div>
            <h>Welcome Events</h>
            <p>Sample test from Events page.</p>
        </div>
    );
}
