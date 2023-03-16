/*+===================================================================
File: OrgOff.js

Summary: A holder page for the organization officers page

Exported Data Structures: None

Exported Functions: Officers

Contributors:
    Sam Merlin 2/21/2023 - SP 269

===================================================================+*/
import React from 'react';
import {useLocation} from 'react-router-dom'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import '../../Styles/OrgOff.css'   
export default function Officers() {
    const location = useLocation()
    const data = location.state.data;
    return(
        <div className='offFormContainter'>
            <div className='offFormDataContainer'>
                <Box component="div" sx={{ display: 'inline' }}>
                    <label className='emailInput'>Officer Email</label> 
                        <input className='emInput'></input>
                     <Button sx={{  color: 'white', backgroundColor: '#38741D', border: 1, borderRadius: 15 }}> + </Button> 
                </Box>
            </div>
        </div>
    );
}