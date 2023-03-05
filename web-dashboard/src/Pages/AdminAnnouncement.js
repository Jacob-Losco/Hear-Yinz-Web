/*+===================================================================
File: AdminAnnouncement.js

Summary: Host content for Admin Annoucements page

Exported Data Structures: None

Exported Functions: AdminAnnouncement

Contributors:
	Philip Pavlick - 02/18/23 - SP-312
  Philip Pavlick - 03/2/23  - SP-464 & 390

===================================================================+*/

import React, { useState, useEffect } from 'react';
import Grid  from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { fnGetAnnouncementRequests} from '../DBFunctions';
import { onAuthStateChanged } from 'firebase/auth';
import { oAuthentication } from '../firebase-config';
import '../font.css';
import './AdminEvents.css';


export default function AdminAnnouncement() {


        const [iAnnouncement, setiAnnouncement] = useState([]);
    
        useEffect(() => {
          const fnRenderEvents = async () => {
            let oAnnouncement = await fnGetAnnouncementRequests();
            setiAnnouncement(oAnnouncement);
            console.log(oAnnouncement);
          }
          
          onAuthStateChanged(oAuthentication, (oCurrentUser) => {          
            if(oCurrentUser != null) {
              fnRenderEvents()
            }
          });
    
    
        }, []);
    

    
        
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
                  <Grid item xs={1} sx={{mt: .75}}>
                    <div>
                      <button className='EventApproveButton' >
    
                      </button>
                    </div>
                  </Grid>
                  <Grid item xs={1} sx={{mt: .75}}>
                    <div>
                      <button className='EventDenyButton'>
    
                      </button>
                    </div>
                  </Grid>
                </Grid>
              </Box>
    
            ))}
    
          </Box>
    
        );
      } 
    