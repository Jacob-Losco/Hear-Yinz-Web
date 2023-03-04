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
import './OrgE.css'    
import {useLocation} from 'react-router-dom'

function StatusChecking(status){
  if (status == 0){
    return(
      <Box sx={{ m: 1, color: 'white', backgroundColor: 'rgb(102,102,102)', border: 1, borderRadius: 50 }} >Private</Box >);}
   else if (status == 1){
    return(
      <Box sx={{ m: 1, color: 'white', backgroundColor: '#38741D', border: 1, borderRadius: 50 }} >Approved</Box >);}
    else if (status == 2){
      return(
        <Box sx={{ m: 1, color: 'white', backgroundColor: '#3C78D8', border: 1, borderRadius: 50 }} >Pending</Box >);}
    else if (status == 3){
      return(
        <Box sx={{ m: 1, color: 'white', backgroundColor: '#E69138', border: 1, borderRadius: 50 }} >Denied</Box >);}
    else if (status == 4){
      return(
        <Box sx={{ m: 1, color: 'white', backgroundColor: '#CC0000', border: 1, borderRadius: 50 }} >Removed</Box >);}    
    return(<p></p>)
}

export default function Events() {

  const location = useLocation()
    const OrgInfo = location.state.data;
    const [iEvents, setiEvents] = useState([]);
    const EventInfo = null;

    useEffect(() => {
      const fnRenderEvents = async () => {
        let oEvents = await fnGetOrganizationEvents(OrgInfo.id);
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
                        <div className='box'>{iEvent.location.location_name}</div><br></br>       
                            <div> { moment( iEvent.event_timestamp.seconds * 1000 + iEvent.event_timestamp.nanoseconds / 1000000 ).format("MMM Do YY, h:mm a")  }</div>
                                <div>
                                  <Button component={Link} to ="AddEventForm" state={{data:OrgInfo, EventInfo:iEvent}} sx={{ m: 1, color: 'black', backgroundColor: '#E69138', border: 1 }} >Edit</Button >
                                  <Button  sx={{color: 'black', backgroundColor: '#CC0000', border: 1 }}>Delete</Button>
                                </div>
                            <div className='box'>{StatusChecking(iEvent.event_status)}</div>
                            </Box>
                        <div className='box'>{iEvent.event_name}</div>
                    </Grid>
                ))}
                  <div>
                    <Box sx={{height:170, width:200, m:2, border: 1, borderRadius: '8px'}}>
                      <div>
                        <Button data-testid="linkertonTwo" component={Link} to ="AddEventForm" state={{data:OrgInfo, EventInfo:null}} sx={{ fontSize:22, color: 'black', fontWeight:'bold', height:170, width:200 }} >Add Event</Button >
                     </div>
                   </Box>
                  </div>
            </Grid>
      </Box>
    );
}
