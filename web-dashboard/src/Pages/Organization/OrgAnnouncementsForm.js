/*+===================================================================
File: OrgAnnouncementsForm.js

Summary: Form for creating announcements for an organization

Exported Data Structures: None

Exported Functions: None

Contributors:
    Sam Merlin 2/21/2023 - SP 269
    Jacob Losco 2/25/2023 - SP 466

===================================================================+*/
import React, { useState } from 'react';
import '@fontsource/dm-sans';
import '../../Styles/font.css';
import '../../Styles/OrgAnnouncementsForm.css';
import { fnCreateAnnouncement } from '../../DBFunctions';
import {useLocation} from 'react-router-dom'

const OrgAnnouncemntsForm = ({triggerRequestsAddUpdate}) => {

    const [sAnnouncementMessage, fnSetAnnouncementMessage] = useState("");
    const [sAnnouncementStatus, fnSetAnnouncementStatus] = useState("");
    const oOrganization = useLocation().state.data;

    /*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Function: fnHandleAnnouncementFormSubmit
  
    Summary: front end validates announcement form submission and handling submission to backend
  
    Args: None
  
    Returns: None
    -------------------------------------------------------------------F*/
    const fnHandleAnnouncementFormSubmit = async () => {
        const oMessage = document.querySelector(".AnnouncementMessage");
        if(sAnnouncementMessage == "" || sAnnouncementStatus == "") {
            oMessage.innerHTML = "Invalid input. Please complete all form elements."
        } else {
            const error = await fnCreateAnnouncement(oOrganization.id, {
                announcement_message: sAnnouncementMessage,
                announcement_status: sAnnouncementStatus == "Public" ? 1 : 0,
                announcement_timestamp: new Date()
            });
            if(error) {
                oMessage.innerHTML = "Error creating announcement. Please try again later.";
            } else {
                document.querySelector(".AnnouncementTextInput").value = "";
                document.querySelector(".AnnouncementPrivateRadio").checked = false;
                document.querySelector(".AnnouncementPublicRadio").checked = false;
                fnSetAnnouncementMessage("");
                fnSetAnnouncementStatus("");
                oMessage.innerHTML = "Successfully created announcement!";
                triggerRequestsAddUpdate();
            }
        }
    }

    return(
        <div className="OrganizationAnnouncementsContainer">
            <div className="AnnouncementFormContainer">
                <div className="AnnouncementTextAreaContainer">
                    <div className="AnnouncementLabelContainer">
                        <p className="AnnouncementLabel">Message:</p>
                    </div>
                    <div className="AnnouncementTextInputContainer">
                        <textarea className="AnnouncementTextInput" onChange={(event) => {
                            fnSetAnnouncementMessage(event.target.value);
                        }}></textarea>
                    </div>    
                </div>
                <div className="AnnouncementRadioContainer">
                    <div className="AnnouncementPublicRadioContainer">
                        <input type="radio" value="Public" className="AnnouncementPublicRadio" onChange={(event) => {
                            document.querySelector(".AnnouncementPrivateRadio").checked = false;
                            fnSetAnnouncementStatus(event.target.value);
                        }}/> Public
                    </div>
                    <div className="AnnouncementPrivateRadioContainer">
                        <input type="radio" value="Private" className="AnnouncementPrivateRadio" onChange={(event) => {
                            document.querySelector(".AnnouncementPublicRadio").checked = false;
                            fnSetAnnouncementStatus(event.target.value);
                        }}/> Private (Followers Only)
                    </div>
                </div>
                <div className="AnnouncementButtonContainer">
                    <div className="AnnouncementCancelButtonContainer">
                        <button className="AnnouncementCancelButton" onClick={(event) => {
                            document.querySelector(".AnnouncementTextInput").value = "";
                            document.querySelector(".AnnouncementPrivateRadio").checked = false;
                            document.querySelector(".AnnouncementPublicRadio").checked = false;
                            document.querySelector(".AnnouncementMessage").innerHTML = "";
                            fnSetAnnouncementMessage("");
                            fnSetAnnouncementStatus("");
                        }}>Cancel</button>
                    </div>
                    <div className="AnnouncementSubmitButtonContainer">
                        <button className="AnnouncementSubmitButton" onClick={fnHandleAnnouncementFormSubmit}>Submit</button>
                    </div>
                </div>
                <div className="AnnouncementMessageContainer">
                    <p className="AnnouncementMessage"></p>
                </div>
            </div>
        </div>
    );
}

export default OrgAnnouncemntsForm;