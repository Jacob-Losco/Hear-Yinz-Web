/*+===================================================================
File: OrgOff.js


Summary: A holder page for the organization officers page


Exported Data Structures: None


Exported Functions: Officers


Contributors:
    Sam Merlin 2/21/2023 - SP 269


===================================================================+*/
import React,{ useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import '../../Styles/OrgOff.css';
import {fnAddOfficer,fnGetOrganizationOfficers,fnRemoveOfficer} from   '../../DBFunctions'
import { onAuthStateChanged } from 'firebase/auth';
import { oAuthentication } from '../../firebase-config';

const OrgOff = ({triggerRequestsAddUpdate}) => {
    const location = useLocation()
    const OrgInfo = location.state.data;
    const [sOfficerEmail, fnSetOfficerEmail] = useState("");
    const [sOfficers, fnSetOfficers] = useState([]);


    useEffect(() => {
        const fnRenderOfficers = async () => {
          let oOfficers = await fnGetOrganizationOfficers(OrgInfo.id);
          fnSetOfficers(oOfficers);
          console.log(oOfficers)
        }
       
        onAuthStateChanged(oAuthentication, (oCurrentUser) => {          
          if(oCurrentUser != null) {
            fnRenderOfficers()
          }
        });
      }, []);




    const fnHandleAddOfficer = async () => {
        const oMessage = document.querySelector(".AnnouncementMessage");
        if(sOfficerEmail == "") {
            oMessage.innerHTML = "Invalid input. Please enter an email!"
        } else {
            const error = await fnAddOfficer(OrgInfo.id, sOfficerEmail);
            if(error) {
                console.log(error);
                oMessage.innerHTML = "Invalid Email. Ensure the user exists in your institution or contact administration!";
            } else {
                document.querySelector(".emInput").value = "";
                oMessage.innerHTML = "An officer request has been made, check back later to see if the officer was approved!";
                document.querySelector(".emailInput").value = "";
                fnSetOfficerEmail('');
                triggerRequestsAddUpdate();
            }
        }
    }
     const reload = () => {
         setTimeout(() => {
             document.location.reload();
         }, 1800);
         }
    return(
        <div>
        <div className='offFormContainter'>
            <div className='offFormDataContainer'>
                <Box component="div" sx={{ display: 'inline' }}>
                    <label className='emailInput'>Officer Email</label>
                        <input placeholder='Add an account here!'className='emInput'onChange={(event) => {
                        fnSetOfficerEmail(event.target.value);}}></input>
                     <Button sx={{ ml:2,width:16,color: 'white', backgroundColor: '#38741D', border: 1, borderRadius: 15,  borderColor:'black' }}
                     onClick={fnHandleAddOfficer}> Add </Button>
                </Box>
                <div className='InnerHTML'>
                <p className="AnnouncementMessage"></p>
            </div>
         </div>
    </div>
    <div className='smalldiv'>
    <Box >
        {sOfficers.map(sOfficer => ( 
          <Box key={sOfficer.event_id}>
            <Grid sx={{width:570}} className='OuterGrid'  container spacing={4} textAlign="center">
              <Grid item xs={4} >
                <div className='LeftRequest'>
                    {sOfficer.account_email}
                </div>
              </Grid>
              <Grid item xs={6} >
              </Grid>
              <Grid item xs={1} sx={{mt: .5}}>
                <div>
                    <Button sx={{alignItems: "flex-end" ,color: 'black', backgroundColor: '#CC0000', border: 1}}onClick={() => {
                        const confirmBox = window.confirm(
                        "Do you really want to remove this Officer?")
                        if (confirmBox === true) {
                        fnRemoveOfficer(OrgInfo.id,sOfficer.account_email);
                        reload();
                        }} }>
                    Remove</Button>
                </div>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
      </div>
    </div>
    );
}

export default OrgOff;

{/* <div className='smalldiv'>
        <Grid container spacing={{ xs: 9, md: 2 }} columnSpacing = {4}>
                        {sOfficers.map(sOfficer => ( 
                            <Grid key={sOfficer.event_id} sx={{height:38,width: 550}}>
                                <Grid>{sOfficer.account_email}&nbsp;
                                
                                {/* {roleChecking(sOfficer.account_role)} */}
                               // </Grid>
                       // </Grid>
               // ))}
           // </Grid>
          //  </div> */}