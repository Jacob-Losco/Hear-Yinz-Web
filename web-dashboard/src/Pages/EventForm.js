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

export default function AddEventForm() {
    const location = useLocation()
    const OrgInfo = location.state.data;
    const EventInfo = location.state.EventInfo;
    const [SOrgLocations, setLocations] = useState([]);
    const [sEventName, fnSetEventName] = useState("");
    const [sEventDate, fnSetEventDateTime] = useState("");
    const [sEventLocation, fnSetEventLocation] = useState("");
    const [sEventDescription, fnSetEventDescription] = useState("");
    const [sEventStatus, fnSetEventStatus] = useState("");

      useEffect(() => {
        const RenderLocations = async () => {
          let TheOrgLocations = await fnGetLocations();
          setLocations(TheOrgLocations);
        }

        onAuthStateChanged(oAuthentication, (oCurrentUser) => {          
            if(oCurrentUser != null) {
              RenderLocations()
            }
          });
    }, []);

    const fnHandleEventFormSubmit = async () => {
        const oMessage = document.querySelector(".AnnouncementMessage");
        if(sEventName == "" || sEventStatus == "") {
            oMessage.innerHTML = "Invalid input. Please complete all form elements."
        } else {
            const error = await fnCreateEvent(OrgInfo.id, {
                event_description: sEventDescription,
                event_location: sEventLocation,
                event_name: sEventName,
                event_status: sEventStatus,
                event_timestamp: sEventDate,
            });
            if(error) {
                oMessage.innerHTML = "Error creating announcement. Please try again later.";
            } else {
                document.querySelector(".EventNameInput").value = "";
                document.querySelector(".EventDescriptionInput").value = "";
                document.querySelector(".RadioBtnPrivate").checked = false;
                document.querySelector(".RadioBtnPublic").checked = false;
                fnSetEventName("");
                fnSetEventDescription("");
                oMessage.innerHTML = "Successfully created announcement!";
            }
        }
    }

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
                    <input defaultValue={GetEventName(EventInfo)} className = "EventNameInput"
                    onChange={(event) => {
                        fnSetEventName(event.target.value);}}></input> 
                </div>
            <div>
                <label for='eventDateTime' className="text">Date and Time</label>
                    <input defaultValue={GetEventTime(EventInfo)} className = "EventTimeInput" type="datetime-local" id="eventDateTime" name="eventDateTime"
                    onChange={(event) => {
                        fnSetEventDateTime(event.target.value);}}></input>

                </div>

                <div>
                <label className="text">Location</label>

                <select name="loc" id="onSite" className = 'EventLocationSelectInput'onChange={(event) => {
                        fnSetEventLocation(event.target.value);}}>

                <option value={GetEventlocation(EventInfo)}>{GetEventlocation(EventInfo)}</option>
                    {SOrgLocations.map(SOrgLocation => (
                    <option value={SOrgLocation.location_name} key={SOrgLocation} >{SOrgLocation.location_name}</option>
                    ))};
                </select>
                </div>

                <label className="text">Description</label>
                    <textarea defaultValue={GetEventDescription(EventInfo)} className="EventDescriptionInput"onChange={(event) => {
                        fnSetEventDescription(event.target.value);}}></textarea>
                </div>
                <div>
                <input type="radio" name="action" className='RadioBtnPublic' onChange={(event) => {
                            document.querySelector(".RadioBtnPublic").checked = false;
                            fnSetEventStatus(event.target.value);
                        }}/> <label className='RadioLabel'>Public</label>
                <input type="radio" name="action" className='RadioBtnPrivate' onChange={(event) => {
                            document.querySelector(".RadioBtnPrivate").checked = false;
                            fnSetEventStatus(event.target.value);}}/> <label className='RadioLabel'>Private &#40;Followers Only&#41;</label>
            </div>
            <div>
                <button className='cancelBtn'>Cancel</button>
                <button className='submitBtn' onClick={fnHandleEventFormSubmit}>Create</button>
            </div>
        </div>
            <div className="AnnouncementMessageContainer">
                <p className="AnnouncementMessage"></p>
            </div>
    </div>
</div>
    );
}
