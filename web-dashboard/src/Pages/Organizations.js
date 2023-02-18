/*+===================================================================
File: Organizations.js

Summary: Hosts content for Organizations page.

Exported Data Structures: None

Exported Functions: Organizations 

Contributors:
	Philip Pavlick - 02/2/23 - SP-263
  Sam Merlin - 02/10/23
===================================================================+*/
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import './OrgList.css'      
import { useEffect } from 'react';  
import { fnGetOfficerOrganizations} from '../DBFunctions';
import { onAuthStateChanged } from 'firebase/auth';
import { oAuthentication } from '../firebase-config';

export default function Organizations() {

  const [iOrganizations, setiOrganizations] = useState([]);

  useEffect(() => {
    const fnUpdateOrganizations = async () => {
      let oOrgs = await fnGetOfficerOrganizations();
      setiOrganizations(oOrgs)
    }
    
    onAuthStateChanged(oAuthentication, (oCurrentUser) => {          
      if(oCurrentUser != null) {
        fnUpdateOrganizations()
      }
    });
  }, []);

  return(
    <Box sx={{ m: 9 }} >
      <Grid container spacing={{ xs: 9, md: 5 }} columnSpacing = {4}>
        {iOrganizations.map(iOrganization => (
          <Grid  textAlign='center' item xs={5} sm={4} md={3} key={iOrganization.id}>
            <div>
              <img className='img' src={iOrganization.img} width={150} height={150} />
            </div>
            <div>{iOrganization.name}</div>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
};