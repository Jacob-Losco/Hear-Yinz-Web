/*+===================================================================
File: AdminEvents.js

Summary: Returns HTML of a grid for admin events.

Exported Data Structures: None

Exported Functions: AdminEvents

Contributors:
  Philip Pavlick - 03/1/23  - SP-396
===================================================================+*/

import React, { useState, useEffect } from 'react';
import Grid  from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { fnGetEventRequests, fnHandleEventRequest} from '../../DBFunctions';
import { onAuthStateChanged } from 'firebase/auth';
import { oAuthentication } from '../../firebase-config';
import '../../Styles/font.css';
import '../../Styles/AdminRequests.css';
import moment from 'moment';

export default function AdminEvents() {
    const [aoEvents, setEvents] = useState([]);

    useEffect(() => {
      const fnRenderEvents = async () => {
        let aoEvents = await fnGetEventRequests();
        setEvents(aoEvents);
      }
      
      onAuthStateChanged(oAuthentication, (oCurrentUser) => {   
        this.props.triggerRequestsUpdate(true);       
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
      setEvents(oEvents);
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
      setEvents(oEvents);
    }

    return(
      <Box >
        {aoEvents.map(oEvent => ( 
          <Box sx={{ m: 9, border: 1, borderRadius: '4px' }} key={oEvent.event_id}>
            <Grid className='OuterGrid'  container spacing={2} textAlign="center">
              <Grid item xs={4} >
                <div className='LeftRequest'>
                    {oEvent.event_name}
                    <br></br>
                    {oEvent.host.organization_name}
                </div>
              </Grid>
              <Grid item xs={6} >
                <div className='MiddleRequest'> 
                {oEvent.location.location_name}
                  <br></br>
                  { moment( oEvent.event_timestamp.seconds * 1000 + oEvent.event_timestamp.nanoseconds / 1000000 ).format("dddd, MMMM Do YYYY, h:mm a")  }
                </div>
              </Grid>
              <Grid item xs={1} sx={{mt: .5}}>
                <div>
                  <button className='EventApproveButton' onClick={() => fnHandleEventRequestApprove(oEvent.host_id, oEvent.event_id)}>

                  </button>
                </div>
              </Grid>
              <Grid item xs={1} sx={{mt: .5}}>
                <div>
                  <button className='EventDenyButton'onClick={() => fnHandleEventRequestDeny(oEvent.host_id, oEvent.event_id)}>

                  </button>
                </div>
              </Grid>
            </Grid>
          </Box>

        ))}

      </Box>

    );
  } 

