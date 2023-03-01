/*+===================================================================
File: AdminEvents.js

Summary: Returns HTML of a grid for admin events.

Exported Data Structures: None

Exported Functions: AdminEvents

Contributors:
	Philip Pavlick - 02/18/23 - SP-312
  Philip Pavlick - 02/25/23 - SP-314
  Philip Pavlick - 02/26/23 - SP-388
===================================================================+*/

import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useEffect } from 'react';  
import { fnGetEventRequests} from '../DBFunctions';
import { onAuthStateChanged } from 'firebase/auth';
import { oAuthentication } from '../firebase-config';
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


    return(
      <Box >
        {iEvents.map(iEvent => ( 
          <Box sx={{ m: 9, border: 1, borderRadius: '4px'}} key={iEvent.event_id}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <div>{iEvent.event_name}</div>
              </Grid>
              <Grid item xs={7}>
                <div>{iEvent.location.location_name}</div>
              </Grid>
              <Grid item xs={1}>
                <div></div>
              </Grid>
              <Grid item xs={4}>
                <div>{iEvent.host.organization_name}</div>
              </Grid>
              <Grid item xs={7}>
                <div> { moment( iEvent.event_timestamp.seconds * 1000 + iEvent.event_timestamp.nanoseconds / 1000000 ).format("dddd, MMMM Do YYYY, h:mm a")  }</div>
              </Grid>
              <Grid item xs={1}>
                <div></div>
              </Grid>
            </Grid>
          </Box>

        ))}

      </Box>

    );
  } 
