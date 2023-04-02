/*+===================================================================
File: AdminAnnouncement.js

Summary: Host content for Admin Annoucements page

Exported Data Structures: None

Exported Functions: AdminAnnouncement

Contributors:
  Philip Pavlick - 03/5/23  - SP-300

===================================================================+*/

import React, { useState, useEffect } from 'react';
import Grid  from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { fnGetAnnouncementRequests, fnHandleAnnouncementRequest} from '../../DBFunctions';
import { onAuthStateChanged } from 'firebase/auth';
import { oAuthentication } from '../../firebase-config';
import '../../Styles/font.css';
import '../../Styles/AdminRequests.css';


const AdminAnnouncement = ({triggerRequestsRemoveUpdate}) => {
        const [aoAnnouncement, setAnnouncement] = useState([]);
        const [bAnnouncementRequestsAreLoaded, setAnnouncementRequestsAreLoaded] = useState(false);
    
        useEffect(() => {
          const fnRenderEvents = async () => {
            let aoAnnouncement = await fnGetAnnouncementRequests();
            setAnnouncement(aoAnnouncement);
            setAnnouncementRequestsAreLoaded(true);
          }
          
          onAuthStateChanged(oAuthentication, (oCurrentUser) => {          
            if(oCurrentUser != null) {
              fnRenderEvents()
            }
          });
        }, []);

    /*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Function: fnHandleAnnouncementRequestApprove
  
    Summary: front end passes true variable to backend in order to change value of announcement_status to reflect approval
  
    Args: event.host_id & event.event_id
  
    Returns: None
    -------------------------------------------------------------------F*/
    async function fnHandleAnnouncementRequestApprove(sOrganizationId, sAnnouncementId) {
      await fnHandleAnnouncementRequest(sOrganizationId, sAnnouncementId, true);
      let aoAnnouncement = await fnGetAnnouncementRequests();
      triggerRequestsRemoveUpdate();
      setAnnouncement(aoAnnouncement);
    }

    /*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Function: fnHandleAnnouncementRequestDeny
  
    Summary: front end passes true variable to backend in order to change value of announcement_status to reflect refusal
  
    Args: announcement.host_id & announcement.event_id
  
    Returns: None
    -------------------------------------------------------------------F*/
    async function fnHandleAnnouncementRequestDeny(sOrganizationId, sAnnouncementId) {
      await fnHandleAnnouncementRequest(sOrganizationId, sAnnouncementId, false);
      let aoAnnouncement = await fnGetAnnouncementRequests();
      triggerRequestsRemoveUpdate();
      setAnnouncement(aoAnnouncement);
    }
    
    return(
      <div>
        {bAnnouncementRequestsAreLoaded == false ? (
          <div class="loadingContainer">
            <p>loading...</p>
          </div>
        ) : (
<Box >
        { aoAnnouncement.map( oAnnouncement => ( 
          <Box sx={{ m: 9, border: 1, borderRadius: '10px' }} key={oAnnouncement.announcement_id}>
            <Grid className='OuterGrid'  container spacing={2} textAlign="center">
              <Grid item xs={3} sx={{mt: .9, mb: .3}} >
                <div className='AnnoucementLeftRequest'>
                  {oAnnouncement.host.organization_name}
                </div>
              </Grid>
                <Grid item xs={7} sx={{mt: .9, mb:.3}} >
                  <div className='AnnoucementMiddleRequest'> 
                    {oAnnouncement.announcement_message}
                  </div>
                </Grid>
                <Grid item xs={1} sx={{mt: .3, mb: .3}}>
                  <div>
                    <button className='EventApproveButton' onClick={() => fnHandleAnnouncementRequestApprove(oAnnouncement.host_id, oAnnouncement.announcement_id)}>
                      Approve
                    </button>
                  </div>
                </Grid>
                <Grid item xs={1} sx={{mt: .3, mb: .3}} >
                  <div>
                    <button className='EventDenyButton'onClick={() => fnHandleAnnouncementRequestDeny(oAnnouncement.host_id, oAnnouncement.announcement_id)}>
                      Deny
                    </button>
                  </div>
                </Grid>
              </Grid>
          </Box>
        ))}
      </Box>
        )}
      </div>
    );
  } 
    
export default AdminAnnouncement;