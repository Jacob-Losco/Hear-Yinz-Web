/*+===================================================================
File: OrgOff.js

Summary: A holder page for the organization officers page

Exported Data Structures: None

Exported Functions: Officers

Contributors:
    Sam Merlin 2/21/2023 - SP 269

===================================================================+*/
import React,{ useState} from 'react';
import {useLocation} from 'react-router-dom'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import '../../Styles/OrgOff.css';
import {fnAddOfficer} from   '../../DBFunctions'
export default function Officers() {

    const [sOfficerEmail, fnSetOfficerEmail] = useState("");

    const location = useLocation()
    const OrgInfo = location.state.data;

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
        <div className='offFormContainter'>
            <div className='offFormDataContainer'>
                <Box component="div" sx={{ display: 'inline' }}>
                    <label className='emailInput'>Officer Email</label> 
                        <input className='emInput'onChange={(event) => {
                        fnSetOfficerEmail(event.target.value);}}></input>
                     <Button sx={{  color: 'white', backgroundColor: '#38741D', border: 1, borderRadius: 15,  borderColor:'black' }}
                     onClick={fnHandleAddOfficer}> + </Button> 
                </Box>
                <div className='InnerHTML'>
                <p className="AnnouncementMessage"></p>
            </div>
            </div>


        </div>
    );
}