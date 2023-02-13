/*+===================================================================
File: Organizations.js

Summary: Hosts content for Organizations page.

Exported Data Structures: None

Exported Functions: Organizations 

Contributors:
	Philip Pavlick - 02/2/23 - SP-263

===================================================================+*/

import React, { useState } from 'react';
import { useEffect } from 'react';  
import { fnGetOfficerOrganizations } from '../DBFunctions';
import { onAuthStateChanged } from 'firebase/auth';
import { oAuthentication } from '../firebase-config';

export default function Organizations() {

    useEffect(() => {
        const fnUpdateOrganizations = async () => {
            let oOrgs = await fnGetOfficerOrganizations();
            console.log(oOrgs)
            //set state variable to the oOrgs HERE
        }

        onAuthStateChanged(oAuthentication, (oCurrentUser) => {          
            if(oCurrentUser != null) {
              fnUpdateOrganizations()
            }
          });
      }, []);

    return(
        // used to query the organization page
        <div className="OrganizationPage">  
            <h>Welcome Organizations</h>
            <p>Sample text from Organizations page.</p>
        </div>
    );
}
