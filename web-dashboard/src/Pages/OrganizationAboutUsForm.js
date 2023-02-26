/*+===================================================================
File: AboutUs.js

Summary: A holder page for the organization about us page

Exported Data Structures: None

Exported Functions: AboutUs

Contributors:
    Sam Merlin 2/21/2023 - SP 269

===================================================================+*/
import React, { useState, useEffect } from 'react';
import '@fontsource/dm-sans';
import '../font.css';
import './OrganizationAboutUsForm.css';
import { useLocation } from 'react-router-dom'
import { Timestamp } from "firebase/firestore";

export default function OrganizationAboutUsForm() {

    const oOrganization = useLocation().state.data;
    const [sOrganizationImageLink, fnSetOrganizationImageLink] = useState("");
    const [sOrganizationDateLabel, fnSetOrganizationDate] = useState("");

    useEffect(() => {
        fnSetOrganizationImageLink(oOrganization.image);
        const oLastEditTime = new Date(oOrganization.lastedit.seconds * 1000 + oOrganization.lastedit.nanoseconds / 1000000,);
        fnSetOrganizationDate(oLastEditTime.toDateString());
    },[]);

    return(
        <div className="OrganizationAboutUsContainer">
            <div className="AboutUsFormContainer">
                <div className="AboutUsDataContainer">
                    <div className="AboutUsImageAndSpacersContainer">
                        <div className="AboutUsImageAndSpacerContainer">
                            <div className="AboutUsImageVerticalSpacerContainer" />
                            <div className="AboutUsImageContainer">
                                <img className='AboutUsImage' src={sOrganizationImageLink} />
                            </div>
                        </div>
                        <div className="AboutUsImageHorizantalSpacerContainer" />
                    </div>
                    <div className="AboutUsUpdateContainer">
                        <div className="AboutUsUpdateVerticalSpacerContainer" />
                        <div className="AboutUsUpdateDateContainer">
                            <p className="AboutUsUpdateDate">Last edited on {sOrganizationDateLabel}</p>
                        </div>
                        <div className="AboutUsUpdateButtonContainer">
                            <button className="AboutUsUpdateButton">Update</button>
                        </div>
                    </div>
                </div>
                <div className="AboutUsTextInputContainer">
                    <div className="AboutUsLabelContainer">
                        <p className="AboutUsLabel">Description:</p>
                    </div>
                    <div className="AboutUsDescriptionContainer">
                        <textarea className="AboutUsDescription"></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
}