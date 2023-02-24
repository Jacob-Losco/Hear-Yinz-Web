/*+===================================================================
File: AboutAnn.js

Summary: A holder page for the organization Annoucements page

Exported Data Structures: None

Exported Functions: Ann

Contributors:
    Sam Merlin 2/21/2023 - SP 269

===================================================================+*/
import React from 'react';
import {useLocation} from 'react-router-dom'
export default function Ann() {
    const location = useLocation()
    const data = location.state.data;
    return(
        <div>
            <h>Welcome Annoucements</h>
            <p>Sample test from Annoucements Us page.</p>
        </div>
    );
}