/*+===================================================================
File: OrgE.js

Summary: A holder page for the organization Events page

Exported Data Structures: None

Exported Functions: Events

Contributors:
    Sam Merlin 2/21/2023 - SP 269

===================================================================+*/
import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import AddEventForm from './EventForm';
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

function StatusChecking(status){
   if (status == 1){
    return(
      <Box sx={{ m: 1, color: 'black', backgroundColor: '#38741D', border: 1, borderRadius: 50 }} >Approved</Box >);}
    else if (status == 2){
      return(
        <Box sx={{ m: 1, color: 'black', backgroundColor: '#3C78D8', border: 1, borderRadius: 50 }} >Pending</Box >);}
    return(<p></p>)
}

export default function Events() {

  const location = useLocation()
    const OrgInfo = location.state.data;

    const [iEvents, setiEvents] = useState([]);

    useEffect(() => {
      const fnRenderEvents = async () => {
        let oEvents = await fnGetOrganizationEvents(OrgInfo.id);
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
        <Box sx={{ m: 5 }} >
            <Grid container spacing={{ xs: 9, md: 2 }} columnSpacing = {4}>
                {iEvents.map(iEvent => ( 
                    <Grid textAlign='center' key={iEvent.event_id}>
                        <Box sx={{height:170, width:200, m:2, border: 1, borderRadius: '8px'}}>   
                          <div>{iEvent.location.location_name}</div><br></br>       
                            <div> { moment( iEvent.event_timestamp.seconds * 1000 + iEvent.event_timestamp.nanoseconds / 1000000 ).format("MMM Do YY, h:mm a")  }</div>
                              <div>
                                <Button sx={{ m: 1, color: 'black', backgroundColor: '#E69138', border: 1 }} >Edit</Button >
                                <Button sx={{  color: 'black', backgroundColor: '#CC0000', border: 1 }}>Delete</Button>
                              </div>
                            <div>{StatusChecking(iEvent.event_status)}</div>
                          </Box>
                        <div>{iEvent.event_name}</div>
                    </Grid>
                ))}
                  <div>
                    <Box sx={{height:170, width:200, m:2, border: 1, borderRadius: '8px'}}>
                      <div>
                        <Button component={Link} to ="AddEventForm" state={{data:OrgInfo}}  sx={{ color: 'black', fontWeight:'bold', height:170, width:200 }} >Add Event</Button >
                     </div>
                   </Box>
                  </div>
            </Grid>
        </Box>
    );
}