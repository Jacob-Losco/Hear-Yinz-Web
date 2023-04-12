/*+===================================================================
File: OrgE.js

Summary: This is the page holding the events tiles for each organization. A database function is called to populate the cells on the page,
and MUI grid style is applied to the page to style the page

Exported Data Structures: None

Exported Functions: Events

Contributors:
    Sam Merlin 2/21/2023 - SP 269

===================================================================+*/
import React, {useState, useEffect, useCallback} from 'react';
import {Link} from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'; 
import { fnDeleteEvent, fnGetOrganizationEvents} from '../../DBFunctions';
import { onAuthStateChanged } from 'firebase/auth';
import { oAuthentication } from '../../firebase-config';
import moment from 'moment';
import '../../Styles/OrgList.css'  
import '../../Styles/OrgE.css'    
import {useLocation} from 'react-router-dom'
/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Function: StatusChecking(int)
  
    Summary: This function takes in a int, and checks the int. the int is a preditermined status of the event. The return for this function
    is a MUI styled oval that displays the correct status on the page
  
    Args: status
  
    Returns: MUI status
  -------------------------------------------------------------------F*/
function StatusChecking(status){
  if (status == 0){
    return(
      <Box sx={{ m: 1, color: 'white', backgroundColor: 'rgb(102,102,102)', border: 1, borderRadius: 50 }} >Private</Box >);}
   else if (status == 1){
    return(
      <Box sx={{ m: 1, color: 'white', backgroundColor: '#3C78D8', border: 1, borderRadius: 50 }} >Pending</Box >);}
    else if (status == 2){
      return(
        <Box sx={{ m: 1, color: 'white', backgroundColor: '#38741D', border: 1, borderRadius: 50 }} >Approved</Box >);}
    else if (status == 3){
      return(
        <Box sx={{ m: 1, color: 'white', backgroundColor: '#E69138', border: 1, borderRadius: 50 }} >Denied</Box >);}
    else if (status == 4){
      return(
        <Box sx={{ m: 1, color: 'white', backgroundColor: '#CC0000', border: 1, borderRadius: 50 }} >Removed</Box >);}    
    return(<p></p>)
}
/*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Function: Events
  
    Summary: This function takes calls the daata base function fnGetOrganizationEvents, and returns that into an useState Object
  
    Args: none
  
    Returns: none
  -------------------------------------------------------------------F*/
export default function Events() {
  const location = useLocation()
    const OrgInfo = location.state.data;
    const [iEvents, setiEvents] = useState([]);
    const [bEventsAreLoaded, setEventsAreLoaded] = useState(false);
    const EventInfo = null;

    useEffect(() => {
      const fnRenderEvents = async () => {
        let oEvents = await fnGetOrganizationEvents(OrgInfo.id);
        setiEvents(oEvents);
        setEventsAreLoaded(true);
      }
      
      onAuthStateChanged(oAuthentication, (oCurrentUser) => {          
        if(oCurrentUser != null) {
          fnRenderEvents()
        }
      });
    }, []);

    const reload = () => {
      setTimeout(() => {
        document.location.reload();
      }, 1800);
    }

    return(
      <div>
        {bEventsAreLoaded == false ? (
          <div class="eventGridContainer">
            <p>Loading...</p>
          </div>
        ) : (
          <Box sx={{ m: 5 }} >
            <Grid container spacing={{ xs: 9, md: 2 }} columnSpacing = {1}>
                {iEvents.map(iEvent => ( 
                    <Grid textAlign='center' key={iEvent.event_id}>
                        <Box sx={{height:170, width:200, m:2, border: 1, borderRadius: '8px'}}>   
                          <div className='box'>{iEvent.location.location_name}</div><br></br>       
                              <div> { moment( iEvent.event_timestamp.seconds * 1000 + iEvent.event_timestamp.nanoseconds / 1000000 ).format("MMM Do YY, h:mm a")  }</div>
                                  <div>
                                    <Button component={Link} to ="AddEventForm" state={{data:OrgInfo, EventInfo:iEvent}} sx={{ m: 1, backgroundColor: '#E69138', border: 1, textTransform: 'none' }} >
                                    <p className = 'whitetext'>Edit</p></Button >
                                    <Button onClick={() => {const confirmBox = window.confirm(
                                                          "Do you really want to delete this Event?"
                                                        )
                                                        if (confirmBox === true) {
                                                          fnDeleteEvent(OrgInfo.id,iEvent.event_id);
                                                          reload();
                                                        }} }
                                    sx={{ backgroundColor: '#CC0000', border: 1, textTransform: 'none' }}>
                                      <p className = 'whitetext'>Delete</p></Button>
                                 </div>
                             <div className='box'>{StatusChecking(iEvent.event_status)}</div>
                          </Box>
                        <div className='box'>{iEvent.event_name}</div>
                        </Grid>
                      ))}
                  <div>
                    <Box sx={{height:170, width:200, m:2, border: 1, borderRadius: '8px'}}>
                      <div>
                        <Button data-testid="linkertonTwo" component={Link} to ="AddEventForm" state={{data:OrgInfo, 
                          EventInfo:null}} sx={{ fontSize:22, color: 'black', fontWeight:'bold', height:170, width:200 ,textTransform: 'none'}} >Add Event</Button >
                     </div>
                   </Box>
                </div>

          </Grid>
        </Box>
      )}
      </div>
    );
}