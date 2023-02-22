/*+===================================================================
File: OrgAnn.js

Summary: A holder page for the organization officers page

Exported Data Structures: None

Exported Functions: Officers

Contributors:
    Sam Merlin 2/21/2023 - SP 269

===================================================================+*/
import React from 'react';
import {useLocation} from 'react-router-dom'
export default function Officers() {
    const location = useLocation()
    const { name } = location.state
    return(
        <div className="Requests">
            <h>Welcome Officers</h>
            <p>Sample test from Officers page.</p>
        </div>
    );
}