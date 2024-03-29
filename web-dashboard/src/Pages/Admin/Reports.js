/*+===================================================================
File: Reports.js

Summary: Host content for the Reports

Exported Data Structures: None

Exported Functions: Reports

Contributors:
	Philip Pavlick - 02/2/23  - SP-263
    Phili  Pavlick - 03/17/23 - SP-483 & 484

===================================================================+*/

import React, { useState, useEffect } from 'react';
import Grid  from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom'
import { fnGetEventReports  } from '../../DBFunctions';
import { onAuthStateChanged } from 'firebase/auth';
import { oAuthentication } from '../../firebase-config';
import '../../Styles/font.css';
import '../../Styles/AdminRequests.css';

const Reports = () => {

    const [aoReports, setReports] = useState([]);
    const [bReportsAreLoaded, setReportsAreLoaded] = useState(false);

    useEffect(() => {
        const fnRenderReports = async () => {
        let oReports = await fnGetEventReports();
        setReports(oReports);
        setReportsAreLoaded(true);
        }
        
        onAuthStateChanged(oAuthentication, (oCurrentUser) => {          
        if(oCurrentUser != null) {
            fnRenderReports()
        }
        });
    }, []);

    return(
        <div>
            {bReportsAreLoaded == false ? (
                <div className="loadingContainer">
                    <p>loading...</p>
                </div>
            ) : (<Box data-testid="Reports333">
            {aoReports.map (oReports => ( 
                <Box sx={{ m: 9, border: 1, borderRadius: '4px' }} key={oReports.event_id}>
                    <Grid className='OuterGrid' container spacing={2} textAlign="center">
                        <Grid item xs={4} sx={{mt:0}} >
                            <div>
                                {oReports.host.organization_name}
                                <br></br>
                                {oReports.event_name}
                            </div>
                        </Grid>
                        <Grid item xs={5} sx={{mt:1.3}} >
                            {oReports.event_reports > 1 ? 
                                <div>{oReports.event_reports} Reports Recieved</div>
                                :
                                <div>{oReports.event_reports} Report Recieved </div>
                            }

                        </Grid>
                        <Grid item xs={3} sx={{mt:1.3}} >
                            <div>
                                <Button sx={{ m: -1, color: 'white', backgroundColor: '#38741d', border: 0, padding: 0, textTransform: "none" }} component={Link} to ="ReportsExpand" state={{data:oReports}}> View</Button>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
                ))}
        </Box>)}
        </div>
        
    );
}

export default Reports;