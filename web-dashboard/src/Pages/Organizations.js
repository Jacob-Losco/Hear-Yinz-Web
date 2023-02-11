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
import logo from './Recources /HearYinzLogo.png'

      
export default function Organizations() {
    return(
        <Grid container spacing={{ xs: 5, md: 3 }} columnSpacing={ 4 } >
        {Array.from(Array(9)).map((_, index) => (
          <Grid  alignItems='center' item xs={6} sm={4} md={4} key={index}>
            <img src={logo} width={234} height={234} />
            <div>Click for the form!</div>
          </Grid>
        ))}
      </Grid>
  )};
