/*+===================================================================
File: AdminAnnouncement.js

Summary: Host content for Admin Annoucements page

Exported Data Structures: None

Exported Functions: AdminAnnouncement

Contributors:
	Philip Pavlick - 02/18/23 - SP-312
  Philip Pavlick - 03/2/23  - SP-464 & 390
  Philip Pavlick p 03/5/23  - SP-300 & 301

===================================================================+*/

import React, { useState, useEffect } from 'react';
import Grid  from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { fnGetAnnouncementRequests, fnHandleAnnouncementRequest} from '../DBFunctions';
import { onAuthStateChanged } from 'firebase/auth';
import { oAuthentication } from '../firebase-config';
import '../font.css';
import './AdminRequests.css';


export default function AdminAnnouncement() {


        const [iAnnouncement, setiAnnouncement] = useState([]);
    
        useEffect(() => {
          const fnRenderEvents = async () => {
            let oAnnouncement = await fnGetAnnouncementRequests();
            setiAnnouncement(oAnnouncement);
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
      let oAnnouncement = await fnGetAnnouncementRequests();
      setiAnnouncement(oAnnouncement);


    }

    /*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Function: fnHandleAnnouncementRequestDeny
  
    Summary: front end passes true variable to backend in order to change value of announcement_status to reflect refusal
  
    Args: announcement.host_id & announcement.event_id
  
    Returns: None
    -------------------------------------------------------------------F*/
    async function fnHandleAnnouncementRequestDeny(sOrganizationId, sAnnouncementId) {
      await fnHandleAnnouncementRequest(sOrganizationId, sAnnouncementId, false);
      let oAnnouncement = await fnGetAnnouncementRequests();
      setiAnnouncement(oAnnouncement);

    }
    

    
        
        return(

          <Box >
            {iAnnouncement.map(iAnnouncements=> ( 
              <Box sx={{ m: 9, border: 1, borderRadius: '10px' }} key={iAnnouncements.announcement_id}>
                <Grid className='OuterGrid'  container spacing={2} textAlign="center">
                  <Grid item xs={3} sx={{mt: 1.3}} >
                    <div className='LeftRequest'>
                        {iAnnouncements.host.organization_name}
                    </div>
                  </Grid>
                  <Grid item xs={7} sx={{mt: 1.3}} >
                    <div className='MiddleRequest'> 
                    {iAnnouncements.announcement_message}
                    </div>
                  </Grid>
                  <Grid item xs={1} sx={{mt: .5}}>
                    <div>
                      <button className='EventApproveButton' onClick={() => fnHandleAnnouncementRequestApprove(iAnnouncements.host_id, iAnnouncements.announcement_id)}>
    
                      </button>
                    </div>
                  </Grid>
                  <Grid item xs={1} sx={{mt: .5}}>
                    <div>
                      <button className='EventDenyButton'onClick={() => fnHandleAnnouncementRequestDeny(iAnnouncements.host_id, iAnnouncements.announcement_id)}>
    
                      </button>
                    </div>
                  </Grid>
                </Grid>
              </Box>
    
            ))}
    
          </Box>
    
        );
      } 
    
