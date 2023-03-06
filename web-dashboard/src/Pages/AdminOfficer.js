/*+===================================================================
File: AdminOfficer.js

Summary: Host content for Admin Officers page

Exported Data Structures: None

Exported Functions: AdminOfficer

Contributors:
	Philip Pavlick - 02/18/23 - SP-312

===================================================================+*/

import React, { useState, useEffect } from 'react';
import Grid  from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { fnGetOfficerRequests, fnHandleOfficerRequest} from '../DBFunctions';
import { onAuthStateChanged } from 'firebase/auth';
import { oAuthentication } from '../firebase-config';
import '../font.css';
import './AdminRequests.css';


export default function AdminOfficer() {


        const [iOfficers, setiOfficers] = useState([]);
    
        useEffect(() => {
          const fnRenderOfficers = async () => {
            let oOfficers = await fnGetOfficerRequests();
            setiOfficers(oOfficers);
            console.log(oOfficers);
          }
          
          onAuthStateChanged(oAuthentication, (oCurrentUser) => {          
            if(oCurrentUser != null) {
                fnRenderOfficers()
            }
          });
    
    
        }, []);


            /*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Function: fnHandleOfficerRequestApprove
  
    Summary: front end passes true variable to backend in order to change value of relationship_status to reflect approval
  
    Args: iOfficer.account_id & iOfficer.officer_relationship_id
  
    Returns: None
    -------------------------------------------------------------------F*/
    async function fnHandleOfficerRequestApprove(sAccountId, sRelationshipId) {
        await fnHandleOfficerRequest(sAccountId, sRelationshipId, true);
        let oOfficers = await fnGetOfficerRequests();
        setiOfficers(oOfficers);
  
  
      }
  
      /*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Function: fnHandleOfficerRequestDeny
    
      Summary: front end passes true variable to backend in order to change value of relationship_status_status to reflect refusal
    
      Args: iOfficer.account_id & iOfficer.officer_relationship_id
    
      Returns: None
      -------------------------------------------------------------------F*/
      async function fnHandleOfficerRequestDeny(sAccountId, sRelationshipId) {
        await fnHandleOfficerRequest(sAccountId, sRelationshipId, false);
        let oOfficers = await fnGetOfficerRequests();
        setiOfficers(oOfficers);
  
      }
    
        return(
            <Box >
              {iOfficers.map(iOfficer => ( 
                <Box sx={{ m: 9, border: 1, borderRadius: '4px' }} key={iOfficer.account_id}>
                  <Grid className='OuterGrid'  container spacing={2} textAlign="center">
                    <Grid item xs={4} sx={{mt: 1.3}}>
                      <div className='LeftRequest'>
                          {iOfficer.organization_name}
                      </div>
                    </Grid>
                    <Grid item xs={6} sx={{mt: 1.3}}>
                      <div className='MiddleRequest'> 
                      {iOfficer.account_name}
                      </div>
                    </Grid>
                    <Grid item xs={1} sx={{mt: .5}}>
                      <div>
                        <button className='EventApproveButton' onClick={() => fnHandleOfficerRequestApprove(iOfficer.account_id, iOfficer.officer_relationship_id)}>
      
                        </button>
                      </div>
                    </Grid>
                    <Grid item xs={1} sx={{mt: .5}}>
                      <div>
                        <button className='EventDenyButton' onClick={() => fnHandleOfficerRequestDeny(iOfficer.account_id, iOfficer.officer_relationship_id)}>
      
                        </button>
                      </div>
                    </Grid>
                  </Grid>
                </Box>
      
              ))}
      
            </Box>
      
          );
}