/*+===================================================================
File: AboutAnn.js

Summary: A holder page for the organization Annoucements page

Exported Data Structures: None

Exported Functions: OrganizationAnnouncementsForm

Contributors:
    Sam Merlin 2/21/2023 - SP 269
    Jacob Losco 2/25/2023 - SP 466

===================================================================+*/
import React from 'react';
import '@fontsource/dm-sans';
import '../font.css';
import './OrgAnnouncementsForm.css';
import { useLocation } from 'react-router-dom'

export default function OrganizationAnnouncementsForm() {
    const location = useLocation()
    const data = location.state.data;

    return(
        <div className="container">
            <div className="AnnouncementFormContainer">
                <div className="AnnouncementTextAreaContainer">
                    <div className="AnnouncementLabelContainer">
                        <p className="AnnouncementLabel">Message:</p>
                    </div>
                    <div className="AnnouncementTextInputContainer">
                        <textarea className="AnnouncementTextInput"></textarea>
                    </div>    
                </div>
                <div className="AnnouncementRadioContainer">
                    <div className="AnnouncementPublicRadioContainer">
                        <input type="radio" value="Public" className="AnnouncementPublicRadio" /> Public
                    </div>
                    <div className="AnnouncementPrivateRadioContainer">
                        <input type="radio" value="Private" className="AnnouncementPrivateRadio" /> Private (Followers Only)
                    </div>
                </div>
                <div className="AnnouncementButtonContainer">
                    <div className="AnnouncementCancelButtonContainer">
                        <button className="AnnouncementCancelButton">Cancel</button>
                    </div>
                    <div className="AnnouncementSubmitButtonContainer">
                        <button className="AnnouncementSubmitButton">Submit</button>
                    </div>
                </div>
                <div className="AnnouncementMessageContainer">
                    <p className="AnnouncementMessage"></p>
                </div>
            </div>
        </div>
    );
}