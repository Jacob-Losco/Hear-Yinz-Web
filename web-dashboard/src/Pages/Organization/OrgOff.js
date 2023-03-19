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
import {fnAddOfficer,fnGetOrganizationOfficers} from   '../../DBFunctions'
import { onAuthStateChanged } from 'firebase/auth';
import { oAuthentication } from '../../firebase-config';

// function roleChecking(role){
//     if (role == 0){
//       return(
//         <Box sx={{ width:225, height:50,display:'inline-grid' , ml:6,color: 'white', backgroundColor: '#38741D', border: 1, borderColor: 'black',borderRadius: 30, alignItems:'center' }} >
//             User
//         </Box>);}
//      else if (role == 1){
//       return(
//         <Box sx={{ width:225, height:50,display:'inline-grid' , ml:6,color: 'white', backgroundColor: '#38741D', border: 1, borderColor: 'black',borderRadius: 30, alignItems:'center' }} >
//             Officer
//         </Box>);}
//       else if (role == 2){
//         return(
//             <Box sx={{ width:225, height:50,display:'inline-grid' , ml:6,color: 'white', backgroundColor: '#38741D', border: 1, borderColor: 'black',borderRadius: 30, alignItems:'center' }} >
//             Admin
//           </Box>);}
//       return(<p></p>)
//   }

export default function Officers() {
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
            const error = await fnAddOfficer(OrgInfo.id, {
                account_email: sOfficerEmail
            });
            if(error) {
                console.log(error);
                oMessage.innerHTML = "Invalid Email. Ensure the user exists in your institution or contact administration!";
            } else {
                document.querySelector(".emInput").value = "";
                oMessage.innerHTML = "Successfully Added Officer!";
            }
        }
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
            {/* Accounts */}
         </div>
    </div>
    <div className='smalldiv'>
        <Grid container spacing={{ xs: 9, md: 2 }} columnSpacing = {4}>
                        {sOfficers.map(sOfficer => ( 
                            <Grid textAlign='center' key={sOfficer.event_id}>
                                <p className='officerDisplay'>{sOfficer.account_email}
                                {/* {roleChecking(sOfficer.account_role)} */}
                                <Button sx={{ml:25,color: 'black', backgroundColor: '#CC0000', border: 1}}>Remove</Button>
                            </p>
                        </Grid>
                ))}
            </Grid>
            </div>
    </div>
       
    );
}

