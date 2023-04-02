/*+===================================================================
File: Organizations.js

Summary: Hosts content for Organizations page.

Exported Data Structures: None

Exported Functions: Organizations 

Contributors:
	Philip Pavlick - 02/2/23 - SP-263
  Sam Merlin - 02/18/23 - SP-267
===================================================================+*/
import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import '../../Styles/OrgList.css'      
import {Link} from 'react-router-dom'
import { useEffect } from 'react';  
import { fnGetOfficerOrganizations} from '../../DBFunctions';
import { onAuthStateChanged } from 'firebase/auth';
import { oAuthentication } from '../../firebase-config';

export default function Organizations() {

  const [iOrganizations, setiOrganizations] = useState([]);
  const [bOrganizationsAreLoaded, setOrganizationAreLoaded] = useState(false);

  useEffect(() => {
    const fnUpdateOrganizations = async () => {
      let oOrgs = await fnGetOfficerOrganizations();
      setiOrganizations(oOrgs)
      setOrganizationAreLoaded(true);
    }
    
    onAuthStateChanged(oAuthentication, (oCurrentUser) => {          
      if(oCurrentUser != null) {
        fnUpdateOrganizations()
      }
    });
  }, []);

  return(
    <div>
    {bOrganizationsAreLoaded == false ? (
      <div class="organizationGridContainer">
        <p>Loading...</p>
      </div>
    ) : (
      <Box sx={{ m: 9 }} >
      <Grid container spacing={{ xs: 9, md: 5 }} columnSpacing = {4}>
        {iOrganizations.map(iOrganization => (
          <Grid  textAlign='center' item xs={5} sm={4} md={3} key={iOrganization.id}>
            <Button data-testid="linkerton" component={Link} to ="OrgPage/Events" state={{data:iOrganization}} >
            <div>
              <img className='img' src={iOrganization.image} width={150} height={150} alt='orgImg'/>
            </div>
            </Button>
            <div>{iOrganization.name}</div>
          </Grid>
        ))}
      </Grid>
    </Box>
    )}
    </div>
  )
};