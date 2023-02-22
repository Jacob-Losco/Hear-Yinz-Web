/*+===================================================================
File: OrgAnn.js

Summary: A holder page for the organization events page

Exported Data Structures: None

Exported Functions: Events

Contributors:
    Sam Merlin 2/21/2023 - SP 269

===================================================================+*/
import React from 'react';
import {useLocation} from 'react-router-dom'
export default function Events() {
    const location = useLocation()
    const { name } = location.state
    return(
        <div className="Requests">
            <h>Welcome Requests</h>
            <p>Sample test from Requests page.</p>
        </div>
    );
}