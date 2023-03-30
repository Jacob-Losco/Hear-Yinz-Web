/*+===================================================================
File: AdminOfficer.js

Summary: Host content for Admin Officers page

Exported Data Structures: None

Exported Functions: AdminOfficer

Contributors:
  Philip Pavlick - 03/6/23  - SP-392
/===================================================================+*/

import React, { useState, useEffect } from 'react';
import Grid  from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { fnGetOfficerRequests, fnHandleOfficerRequest} from '../../DBFunctions';
import { onAuthStateChanged } from 'firebase/auth';
import { oAuthentication } from '../../firebase-config';
import '../../Styles/font.css';
import '../../Styles/AdminRequests.css';

const AdminOfficer = ({triggerRequestsRemoveUpdate}) => {
        const [aoOfficers, setOfficers] = useState([]);
    
        useEffect(() => {
          const fnRenderOfficers = async () => {
            let oOfficers = await fnGetOfficerRequests();
            setOfficers(oOfficers);
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
        triggerRequestsRemoveUpdate();
        setOfficers(oOfficers);
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
        triggerRequestsRemoveUpdate();
        setOfficers(oOfficers);
      }
    
        return(
            <Box >
              {aoOfficers.map(oOfficer => ( 
                <Box sx={{ m: 9, border: 1, borderRadius: '4px' }} key={oOfficer.account_id}>
                  <Grid className='OuterGrid'  container spacing={2} textAlign="center">
                    <Grid item xs={4}  sx={{mt: .9, mb:.3}}>
                      <div className='OfficerLeftRequest'>
                          {oOfficer.organization_name}
                      </div>
                    </Grid>
                    <Grid item xs={6}  sx={{mt: .9, mb:.3}}>
                      <div className='OfficerMiddleRequest'> 
                      {oOfficer.account_name}
                      </div>
                    </Grid>
                    <Grid item xs={1} sx={{mt: .3, mb: .3}}>
                      <div>
                        <button className='EventApproveButton' onClick={() => fnHandleOfficerRequestApprove(oOfficer.account_id, oOfficer.officer_relationship_id)}>
                          Approve
                        </button>
                      </div>
                    </Grid>
                    <Grid item xs={1} sx={{mt: .3, mb: .3}}>
                      <div>
                        <button className='EventDenyButton' onClick={() => fnHandleOfficerRequestDeny(oOfficer.account_id, oOfficer.officer_relationship_id)}>
                          Deny
                        </button>
                      </div>
                    </Grid>
                  </Grid>
                </Box>
      
              ))}
      
            </Box>
      
          );
}

export default AdminOfficer;