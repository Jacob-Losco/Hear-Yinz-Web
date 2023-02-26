/*+===================================================================
File: AdminEvents.js

Summary: Returns HTML of a grid for admin events.

Exported Data Structures: None

Exported Functions: AdminEvents

Contributors:
	Philip Pavlick - 02/18/23 - SP-312
  Philip Pavlick - 02/25/23 - SP-314

===================================================================+*/

import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useEffect } from 'react';  
import { fnGetEventRequests} from '../DBFunctions';
import { onAuthStateChanged } from 'firebase/auth';
import { oAuthentication } from '../firebase-config';





export default function AdminEvents() {


    const [iEvents, setiEvents] = useState([]);

    useEffect(() => {
      const fnRenderEvents = async () => {
        let oEvents = await fnGetEventRequests();
        setiEvents(oEvents);
        console.log(oEvents);
      }
      
      onAuthStateChanged(oAuthentication, (oCurrentUser) => {          
        if(oCurrentUser != null) {
          fnRenderEvents()
        }
      });
    }, []);


    return(
      <Box >
      {iEvents.map(iEvents => ( 
        <Box sx={{ m: 9, border: 1 }} >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <div>Left</div>
            </Grid>
            <Grid item xs={5}>
              <div>Middle</div>
            </Grid>
            <Grid item xs={1}>
              <div>Right</div>
            </Grid>
          </Grid>
        </Box>

      ))}
      </Box>

    );
  } 




