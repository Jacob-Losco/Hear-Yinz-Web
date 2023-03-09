/*+===================================================================
File: EventForm.js

Summary: A holder page for the organization Events Form page

Exported Data Structures: None

Exported Functions: Events

Contributors:
    Sam Merlin 3/4/2023 - SP 269

===================================================================+*/
import React, { useState, useEffect } from 'react';
import {fnCreateEvent , fnGetLocations} from '../DBFunctions'
import { onAuthStateChanged } from 'firebase/auth';
import { oAuthentication } from '../firebase-config';
import '@fontsource/dm-sans';
import '../font.css';
import './EventForm.css';
import {useLocation} from 'react-router-dom'
import moment from 'moment';

function GetEventName(name){
    if (name){
        return(name.event_name);
    }
    else{
        return
    }
}
function GetEventTime(time){
    if (time){
        return(moment( time.event_timestamp.seconds * 1000 + time.event_timestamp.nanoseconds / 1000000 ).format("YYYY-MM-DDTHH:mm"));
    }
    else{
        return;
    }
}
function GetEventlocation(locations){
    if (locations){
        return(locations.location.location_name);
    }
    else{
        return
    }
}
function GetEventDescription(descript){
    if (descript){
        return(descript.event_description);
    }
    else{
        return
    }
}

function SetRadio(status){
    if (status) {
        if (status == 0){
            return true;
        }
        else if(status == 1){
            return true;
        }
        else{
            return;
        }
   }
   return;
}
export default function AddEventForm() {
    const location = useLocation()
    const OrgInfo = location.state.data;
    const EventInfo = location.state.EventInfo;
    const [SOrgLocations, setLocations] = useState([]);
    const [sEventName, fnSetEventName] = useState("");
    const [sEventDate, fnSetEventDate] = useState("");
    const [sEventTime, fnSetEventime] = useState("");
    const [sEventLocation, fnSetEventLocation] = useState("");
    const [sEventDescription, fndSetEventDescription] = useState("");
    const [sEventStatus, fndSetEventStatus] = useState("");


    const handleChange = (event) => {
        // Get input value from "event"
        //setMessage(event.target.value);
      };

      useEffect(() => {
        const RenderLocations = async () => {
          let TheOrgLocations = await fnGetLocations();
          setLocations(TheOrgLocations);
          console.log(TheOrgLocations);
        }

        onAuthStateChanged(oAuthentication, (oCurrentUser) => {          
            if(oCurrentUser != null) {
              RenderLocations()
            }
          });
    }, []);


    return(
<div className="OrganizationEventFormContainer">
    <div className="EventFormContainer">
        <div className="EventFormUsDataContainer">
        <div className="EventFormInputContainer">
            <div>
                <label className='text'>Name</label> 
                    <input value={GetEventName(EventInfo)} className = "EventNameInput" onChange={handleChange}></input> 
                </div>
            <div>
                <label for='eventDateTime' className="text">Date and Time</label>
                    <input value={GetEventTime(EventInfo)} className = "EventTimeInput" type="datetime-local" id="eventDateTime" name="eventDateTime" onChange={handleChange} >
                    </input>
                </div>

                <div>
                <label className="text">Location</label>
                <select name="loc" id="onSite" className = 'EventLocationSelectInput' onChange={handleChange}>
                <option disabled value={GetEventlocation(EventInfo)}>{GetEventlocation(EventInfo)}</option>
                    {SOrgLocations.map(SOrgLocation => (
                    <option value={SOrgLocation.location_name} key={SOrgLocation} >{SOrgLocation.location_name}</option>
                    ))};
                </select>
                </div>

                <label className="text">Description</label>
                    <textarea value={GetEventDescription(EventInfo)} className="EventDescriptionInput" onChange={handleChange}></textarea>
                </div>
                <div>
                <input type="radio" name="action" className='RadioBtn' /> <label className='RadioLabel'>Public</label>
                <input type="radio" name="action" className='RadioBtn' checked/> <label className='RadioLabel'>Private &#40;Followers Only&#41;</label>
            </div>
            <div>
                <button className='cancelBtn'>Cancel</button>
                <button className='submitBtn'>Create</button>
            </div>
        </div>
    </div>
</div>
    );
}
