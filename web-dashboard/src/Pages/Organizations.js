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
import { fnGetOfficerOrganizations, fnGetOrganizationDictionary } from '../DBFunctions';
import { onAuthStateChanged } from 'firebase/auth';
import { oAuthentication } from '../firebase-config';

export default function Organizations() {

    useEffect(() => {
        const fnUpdateOrganizations = async () => {
            let oOrgs = await fnGetOfficerOrganizations();
            //set state variable to the oOrgs HERE
        }

        onAuthStateChanged(oAuthentication, (oCurrentUser) => {          
            if(oCurrentUser != null) {
              fnUpdateOrganizations()
            }
          });
        const getOrganizationDictionary = async() = {
          let oId = await fnGetOrganizationDictionary();
          //id=array
          //name = underneath the img
        }
      }, []);

    return(
      <Box sx={{ m: 9 }} >
        <Grid container spacing={{ xs: 9, md: 5 }} columnSpacing = {4}>
        {Array.from(Array(10)).map((_, index) => (
          // Array updates dynamically
          <Grid  textAlign='center' item xs={5} sm={4} md={3} key={index}>
            <div>
              <img className="img" src='/Recources/Exmpl1' width={150} height={150} />
              {/* switches based on function */}
            </div>
            <div>Organization Name</div>
            {/* switches based on function */}
          </Grid>
        ))}
      </Grid>
    </Box>
  )};
