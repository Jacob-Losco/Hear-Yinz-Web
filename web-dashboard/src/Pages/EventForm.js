import React, { useState, useEffect } from 'react';
import '@fontsource/dm-sans';
import '../font.css';
import {useLocation} from 'react-router-dom'

export default function AddEventForm() {
    const location = useLocation()
    const OrgInfo = location.state.data;
    const EventInfo = location.state.EventInfo;
    return(
        <div>
        <div>
            {OrgInfo.id}<br></br>      
            {EventInfo.event_name}      
        </div>
        </div>
    );
}