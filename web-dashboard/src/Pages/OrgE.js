/*+===================================================================
File: OrgE.js

Summary: A holder page for the organization Events page

Exported Data Structures: None

Exported Functions: Events

Contributors:
    Sam Merlin 2/21/2023 - SP 269

===================================================================+*/
import React, {useState, useCallback} from 'react';
import {Link} from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';  
import { fnDeleteEvent, fnGetOrganizationEvents} from '../DBFunctions';
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

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      
    };
    const reload = () => {
      setTimeout(() => {
        document.location.reload();
      }, 1800);
    }

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
                                    <Button onClick={handleClickOpen} sx={{  color: 'black', backgroundColor: '#CC0000', border: 1 }}>Delete</Button>
                                 </div>
                             <div className='box'>{StatusChecking(iEvent.event_status)}</div>
                          </Box>
                        <div className='box'>{iEvent.event_name}</div>
                        <Dialog
                            open={open}
                              onClose={handleClose}
                                aria-describedby="alert-dialog-slide-description">
                                  <DialogTitle>{"Are you sure you want to delete this event?"}</DialogTitle>
                                    <DialogContent>
                                      <DialogContentText id="alert-dialog-slide-description" >
                                        <div className='prompt'>
                                          {iEvent.event_name}<br></br>
                                          { moment( iEvent.event_timestamp.seconds * 1000 + iEvent.event_timestamp.nanoseconds / 1000000 ).format("MMM Do YY, h:mm a")}
                                        </div>
                                        </DialogContentText>
                                      </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>No</Button>
                                      <Button onClick={async () => {{handleClose()};fnDeleteEvent(OrgInfo.id,iEvent.event_id);reload()}}>Yes</Button>
                                    </DialogActions>
                                  </Dialog>
                        </Grid>
                      ))}
                  <div>
                    <Box sx={{height:170, width:200, m:2, border: 1, borderRadius: '8px'}}>
                      <div>
                        <Button data-testid="linkertonTwo" component={Link} to ="AddEventForm" state={{data:OrgInfo, 
                          EventInfo:null}} sx={{ fontSize:22, color: 'black', fontWeight:'bold', height:170, width:200 }} >Add Event</Button >
                     </div>
                   </Box>
                </div>
          </Grid>
      </Box>
    );
}