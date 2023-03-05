/*+===================================================================
File: EventForm.js

Summary: A holder page for the organization Events Form page

Exported Data Structures: None

Exported Functions: Events

Contributors:
    Sam Merlin 3/4/2023 - SP 269

===================================================================+*/
import React, { useState, useEffect } from 'react';
import '@fontsource/dm-sans';
import '../font.css';
import {useLocation} from 'react-router-dom'


function GetName(name){

    if (name){
        return(name.event_name);
    }
    else{
        return(<div></div>)
    }

}

export default function AddEventForm() {
    const location = useLocation()
    const OrgInfo = location.state.data;
    const EventInfo = location.state.EventInfo;
    return(
        <div>
        <div>
            {OrgInfo.id}<br></br>
            {GetName(EventInfo)}         
        </div>
        </div>
    );
}