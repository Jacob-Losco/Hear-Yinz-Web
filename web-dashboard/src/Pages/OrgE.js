/*+===================================================================
File: OrgAnn.js

Summary: A holder page for the organization Events page

Exported Data Structures: None

Exported Functions: Events

Contributors:
    Sam Merlin 2/21/2023 - SP 269

===================================================================+*/
import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useEffect } from 'react';  
import { fnGetEventRequests} from '../DBFunctions';
import { onAuthStateChanged } from 'firebase/auth';
import { oAuthentication } from '../firebase-config';
import './OrgList.css'      
import {useLocation} from 'react-router-dom'

export default function Events() {

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


    const location = useLocation()
    const data = location.state.data;
    return(
        <Box sx={{ m: 9 }} >
            <Grid container spacing={{ xs: 9, md: 5 }} columnSpacing = {4}>
                {iEvents.map(iEvent => ( 
                    <Grid textAlign='center' key={iEvent[0].event_id}>
                        <Box sx={{p: 6, m:3, border: 1, borderRadius: '4px'}}>
                            <div>HII</div>
                            <div>{iEvent[0].event_name}</div>
                        </Box>
                        <div>{iEvent[0].event_name}</div>
                    </Grid>
                ))}
            </Grid>
      </Box>
    );
}
