import React, { useState, useEffect } from 'react';
import '@fontsource/dm-sans';
import '../font.css';
import {useLocation} from 'react-router-dom'

export default function AddEventForm() {
    const location = useLocation()
    const OrgInfo = location.state.data;
    const eventProps = location.state.eventProps;
    return(
        <div >
            {OrgInfo.id}      
        </div>
    );
}