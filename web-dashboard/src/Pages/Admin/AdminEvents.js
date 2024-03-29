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

const AdminEvents = ({triggerRequestsRemoveUpdate}) => {
    const [aoEvents, setEvents] = useState([]);
    const [bEventRequestsAreLoaded, setEventRequestsAreLoaded] = useState(false);

    useEffect(() => {
      const fnRenderEvents = async () => {
        let aoEvents = await fnGetEventRequests();
        setEvents(aoEvents);
        setEventRequestsAreLoaded(true);
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
  
    Args: Args: The id of the host organization from which the event is posted
          and the id of the event (event.host_id & event.event_id)
  
    Returns: None
    -------------------------------------------------------------------F*/
    async function fnHandleEventRequestApprove(sOrganizationId, sEventId) {
      await fnHandleEventRequest(sOrganizationId, sEventId, true);
      let oEvents = await fnGetEventRequests();
      triggerRequestsRemoveUpdate();
      setEvents(oEvents);
    }

    /*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Function: fnHandleEventRequestDeny
  
    Summary: front end passes true variable to backend in order to change value of event_status to reflect refusal
  
    Args: Args: The id of the host organization from which the event is posted
          and the id of the event (event.host_id & event.event_id)
  
    Returns: None
    -------------------------------------------------------------------F*/
    async function fnHandleEventRequestDeny(sOrganizationId, sEventId) {
      await fnHandleEventRequest(sOrganizationId, sEventId, false);
      let oEvents = await fnGetEventRequests();
      triggerRequestsRemoveUpdate();
      setEvents(oEvents);
    }

    return(
      <div>
        {bEventRequestsAreLoaded == false ? (
          <div class="loadingContainer">
            <p>loading...</p>
          </div>
        ) : (
        <Box >
        {aoEvents.map(oEvent => ( 
          <Box sx={{ m: 9, border: 1, borderRadius: '0px' }} key={oEvent.event_id}>
            <Grid className='OuterGrid'  container spacing={2} textAlign="center">
              <Grid item xs={4} >
                <div className='AdminEventLeftRequest'>
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
              <Grid item xs={1} sx={{mt: .7, mb: .3}}>
                <div>
                  <button className='EventApproveButton' onClick={() => fnHandleEventRequestApprove(oEvent.host_id, oEvent.event_id)}>
                    Approve
                  </button>
                </div>
              </Grid>
              <Grid item xs={1} sx={{mt: .7, mb: .3}} >
                <div>
                  <button className='EventDenyButton'onClick={() => fnHandleEventRequestDeny(oEvent.host_id, oEvent.event_id)}>
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

export default AdminEvents;