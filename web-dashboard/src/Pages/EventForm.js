/*+===================================================================
File: EventForm.js

Summary: A holder page for the organization Events Form page

Exported Data Structures: None

Exported Functions: Events

Contributors:
    Sam Merlin 3/4/2023 - SP 269

===================================================================+*/
import React, { useState, useEffect } from 'react';
import fnCreateEvent from '../DBFunctions'
import '@fontsource/dm-sans';
import '../font.css';
import './EventForm.css';
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
    const [sEventName, fnSetEventName] = useState("");
    const [sEventDate, fnSetEventDate] = useState("");
    const [sEventTime, fnSetEventime] = useState("");
    const [sEventLocation, fnSetEventLocation] = useState("");
    const [sEventDescription, fndSetEventDescription] = useState("");
    const [sEventStatus, fndSetEventStatus] = useState("");

    return(
        <div className="OrganizationEventFormContainer">
           <div className="EventFormContainer">
                 <div className="EventFormUsDataContainer">
                    <div className="EventFormInputContainer">
                        <div>
                            <label className='text'>Name</label> 
                                <input value={sEventName} className = "EventNameInput"></input> 
                          </div>
                        <div>
                            <label for='eventDateTime' className="text">Date and Time</label>
                                <input className = "EventTimeInput" type="datetime-local" id="eventDateTime" name="eventDateTime"></input>
                            </div>
                        <div>
                            <label  for="loc" className="text">Location</label>
                                <select name="loc" id="onSite" className = 'EventLocationSelectInput' >
                                    <option value="" disabled selected>Select your option</option>
                                    <option value="loc1">loc1</option>
                                    <option value="loc2">loc2</option>
                                    <option value="loc3">loc3</option>
                                </select>
                          </div>
                        <div>
                            <label className="text">Description</label>
                                <textarea value={sEventDescription} className="EventDescriptionInput"></textarea>
                          </div>
                          <div>
                            <input type="radio" name="action" className='RadioBtn'/> <label className='RadioLabel'>Public</label>
                            <input type="radio" name="action" className='RadioBtn'/> <label className='RadioLabel'>Private &#40;Followers Only&#41;</label>
                        </div>
                        <div>
                            <button className='cancelBtn'>Cancel</button>
                            <button className='submitBtn'>Create</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
