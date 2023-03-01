/*+===================================================================
File: OrgE.js

Summary: A holder page for the organization Events page

Exported Data Structures: None

Exported Functions: Events

Contributors:
    Sam Merlin 2/21/2023 - SP 269

===================================================================+*/
import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useEffect } from 'react';  
import { fnGetOrganizationEvents} from '../DBFunctions';
import { onAuthStateChanged } from 'firebase/auth';
import { oAuthentication } from '../firebase-config';
import moment from 'moment';
import './OrgList.css'      
import {useLocation} from 'react-router-dom'

export default function Events() {

  const location = useLocation()
  const data = location.state.data;

    const [iEvents, setiEvents] = useState([]);
  console.log(data.id)
    useEffect(() => {
      const fnRenderEvents = async () => {
        let oEvents = await fnGetOrganizationEvents(data.id);
        console.log(oEvents)
        setiEvents(oEvents);
      }
      
      onAuthStateChanged(oAuthentication, (oCurrentUser) => {          
        if(oCurrentUser != null) {
          fnRenderEvents()
        }
      });
    }, []);

    return(
        <Box sx={{ m: 9 }} >
            <Grid container spacing={{ xs: 9, md: 2 }} columnSpacing = {4}>
                {iEvents.map(iEvent => ( 
                    <Grid textAlign='center' key={iEvent.event_id}>
                        <Box sx={{p: 2, m:2, border: 1, borderRadius: '8px'}}>   
                        <div>{iEvent.event_location}</div>         
                            <div> { moment( iEvent.event_timestamp.seconds * 1000 + iEvent.event_timestamp.nanoseconds / 1000000 ).format("MMM Do YY, h:mm a")  }</div>
                                <div>
                                  <Button sx={{ m: 1, color: 'black', backgroundColor: 'green', border: 1 }} >Edit</Button ><Button sx={{  color: 'black', backgroundColor: 'red', border: 1 }}>Delete</Button>
                                </div>
                                <div>{iEvent.event_status}</div>
                            </Box>
                        <div>{iEvent.event_name}</div>
                    </Grid>
                ))}
            </Grid>
      </Box>
    );
}
