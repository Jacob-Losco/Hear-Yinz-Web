/*+===================================================================
File: Organizations.js

Summary: Hosts content for Organizations page.

Exported Data Structures: None

Exported Functions: Organizations 

Contributors:
	Philip Pavlick - 02/2/23 - SP-263
    Sam Merlin - 02/10/23

===================================================================+*/

import React from "react";
import Grid from '@mui/material/Grid';

      
export default function Organizations() {
    return(
        <Grid container spacing={{ xs: 5, md: 3 }} columnSpacing={ 4 } >
        {Array.from(Array(10)).map((_, index) => (
          <Grid  textAlign='center' item xs={2} sm={2} md={3} key={index}>
            <img className="img" src='/Recources/Exmpl1' width={200} height={200} />
            <div>Organization Name</div>
          </Grid>
        ))}
      </Grid>
  )};
