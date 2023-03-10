/*+===================================================================
File: AdminEvents.js

Summary: Returns HTML of a grid for admin events.

Exported Data Structures: None

Exported Functions: AdminEvents

Contributors:
	Philip Pavlick - 02/18/23 - SP-312
  Philip Pavlick - 02/25/23 - SP-314
  Philip Pavlick - 02/26/23 - SP-388
  Philip Pavlick - 03/1/23  - SP-394 & SP-396
===================================================================+*/

import React, { useState, useEffect } from 'react';
import Grid  from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { fnGetEventRequests, fnHandleEventRequest} from '../DBFunctions';
import { onAuthStateChanged } from 'firebase/auth';
import { oAuthentication } from '../firebase-config';
import '../font.css';
import './AdminRequests.css';
import moment from 'moment';





export default function AdminEvents() {


    const [iEvents, setiEvents] = useState([]);

    useEffect(() => {
      const fnRenderEvents = async () => {
        let oEvents = await fnGetEventRequests();
        setiEvents(oEvents);
      }
      
      onAuthStateChanged(oAuthentication, (oCurrentUser) => {          
        if(oCurrentUser != null) {
          fnRenderEvents()
        }
      });


    }, []);


    /*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Function: fnHandleEventRequestApprove
  
    Summary: front end passes true variable to backend in order to change value of event_status to reflect approval
  
    Args: event.host_id & event.event_id
  
    Returns: None
    -------------------------------------------------------------------F*/
    async function fnHandleEventRequestApprove(sOrganizationId, sEventId) {
      await fnHandleEventRequest(sOrganizationId, sEventId, true);
      let oEvents = await fnGetEventRequests();
      setiEvents(oEvents);


    }

    /*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Function: fnHandleEventRequestDeny
  
    Summary: front end passes true variable to backend in order to change value of event_status to reflect refusal
  
    Args: event.host_id & event.event_id
  
    Returns: None
    -------------------------------------------------------------------F*/
    async function fnHandleEventRequestDeny(sOrganizationId, sEventId) {
      await fnHandleEventRequest(sOrganizationId, sEventId, false);
      let oEvents = await fnGetEventRequests();
      setiEvents(oEvents);

    }

    
    return(
      <Box >
        {iEvents.map(iEvent => ( 
          <Box sx={{ m: 9, border: 1, borderRadius: '4px' }} key={iEvent.event_id}>
            <Grid className='OuterGrid'  container spacing={2} textAlign="center">
              <Grid item xs={4} >
                <div className='LeftRequest'>
                    {iEvent.event_name}
                    <br></br>
                    {iEvent.host.organization_name}
                </div>
              </Grid>
              <Grid item xs={6} >
                <div className='MiddleRequest'> 
                {iEvent.location.location_name}
                  <br></br>
                  { moment( iEvent.event_timestamp.seconds * 1000 + iEvent.event_timestamp.nanoseconds / 1000000 ).format("dddd, MMMM Do YYYY, h:mm a")  }
                </div>
              </Grid>
              <Grid item xs={1} sx={{mt: .5}}>
                <div>
                  <button className='EventApproveButton' onClick={() => fnHandleEventRequestApprove(iEvent.host_id, iEvent.event_id)}>

                  </button>
                </div>
              </Grid>
              <Grid item xs={1} sx={{mt: .5}}>
                <div>
                  <button className='EventDenyButton'onClick={() => fnHandleEventRequestDeny(iEvent.host_id, iEvent.event_id)}>

                  </button>
                </div>
              </Grid>
            </Grid>
          </Box>

        ))}

      </Box>

    );
  } 

