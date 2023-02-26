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
import { fnUpdateOrganizationImage, fnUpdateOrganizationDescription } from '../DBFunctions';

export default function OrganizationAboutUsForm() {

    const oOrganization = useLocation().state.data;
    const [sOrganizationImageLink, fnSetOrganizationImageLink] = useState("");
    const [sOrganizationDateLabel, fnSetOrganizationDate] = useState("");
    const [sOrganizationDescription, fnSetOrganizationDescription] = useState("");
    const [oOrganizationImage, fnSetOrganizationImage] = useState(null);

    useEffect(() => {
        fnSetOrganizationImageLink(oOrganization.image);
        const oLastEditTime = new Date(oOrganization.lastedit.seconds * 1000 + oOrganization.lastedit.nanoseconds / 1000000,);
        fnSetOrganizationDate(oLastEditTime.toDateString());
        fnSetOrganizationDescription(oOrganization.description);
    },[]);

    const fnHandleAboutUsFormSubmission = async () => {
        var success = false;
        if(oOrganizationImage) {
            const error = await fnUpdateOrganizationImage(oOrganizationImage, oOrganization.id);
            if(error) {
                console.log(error);
                success = false;
            }
            else {
                console.log("Successfully uploaded image");
                success = true;
            }
        }
        if(sOrganizationDescription != oOrganization.description) {
            const error = await fnUpdateOrganizationDescription(sOrganizationDescription, oOrganization.id);
            if(error) {
                console.log(error);
                success = false;
            } else {
                console.log("Sucessfully updated description");
                success = true;
            }
        }
        if(success) {
            document.querySelector(".AboutUsMessage").innerHTML = "Organization successfully updated.";
        } else {
            document.querySelector(".AboutUsMessage").innerHTML = "Error updating organization information.";
        }
    }

    return(
        <div className="OrganizationAboutUsContainer">
            <div className="AboutUsFormContainer">
                <div className="AboutUsDataContainer">
                    <div className="AboutUsImageAndSpacersContainer">
                        <div className="AboutUsImageAndSpacerContainer">
                            <div className="AboutUsImageVerticalSpacerContainer" />
                            <div className="AboutUsImageContainer">
                                <img className='AboutUsImage' src={sOrganizationImageLink} />
                                <input type="file" accept=".png" className="AboutUsUploadImageButton" onChange={(event) => {
                                    fnSetOrganizationImage(event.target.files[0]);
                                }} />
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
                            <button className="AboutUsUpdateButton" onClick={fnHandleAboutUsFormSubmission}>Update</button>
                        </div>
                    </div>
                </div>
                <div className="AboutUsTextInputContainer">
                    <div className="AboutUsLabelContainer">
                        <p className="AboutUsLabel">Description:</p>
                    </div>
                    <div className="AboutUsDescriptionContainer">
                        <textarea value={sOrganizationDescription} className="AboutUsDescription" onChange={(event) => {
                            fnSetOrganizationDescription(event.target.value);
                        }}></textarea>
                    </div>
                </div>
                <div className="AboutUsMessageContainer">
                    <p className="AboutUsMessage"></p>
                </div>
            </div>
        </div>
    );
}