/*+===================================================================
File: Reports.js

Summary: Host content for the Reports

Exported Data Structures: None

Exported Functions: Reports

Contributors:
	Philip Pavlick - 02/2/23 - SP-263

===================================================================+*/

import React, { useEffect } from 'react';
// import { async } from '@firebase/util';
// import { fnGetEventReports } from '../DBFunctions';
// import { onAuthStateChanged } from 'firebase/auth';
// import { oAuthentication } from '../firebase-config';





export default function Reports() {


    // useEffect(() => {
    //     const fnDisplayReports = async () => {
    //         let oReports = await fnGetEventReports();
    //         console.log(oReports);
    //     }
    //     onAuthStateChanged(oAuthentication, (oCurrentUser) => {          
    //       if(oCurrentUser != null) {
    //         fnDisplayReports()
    //       }
    //     });
  
    // },[]);

    return(
        <div className="Reports">
            <h>Welcome Reports</h>
            <p>Sample text from report page.</p>
        </div>
    );
}