/*+===================================================================
File: ReportExpand.js

Summary: Host content for the Expanded Report

Exported Data Structures: None

Exported Functions: ReportExpand

Contributors:
	Philip Pavlick - 3/18/23 SP-305,306,307
    Philip Pavlick - 3/24/23 SP-308

===================================================================+*/

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fnHandleEventReport } from '../../DBFunctions';
import { useState } from "react";
import moment from 'moment';
import "../../Styles/ReportsExpand.css"

const ReportsExpand = ({triggerReportsRemoveUpdate}) => {
        const aoReportData = useLocation();
        const navigate = useNavigate()
        console.log(aoReportData)
        

        const [sReportMessage, setReportMessage] = useState( );

    /*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Function: fnHandleEventReportIgnore
  
    Summary: front end passes false variable to backend in order to change value of event_reports to reflect ignore
  
    Args: Args: The id of the organization that has the event that is reported
          and the id of the event (host_id & event_id)
  
    Returns: None
    -------------------------------------------------------------------F*/
    async function fnHandleEventReportIgnore(sOrganizationId, sEventId) {
        await fnHandleEventReport(sOrganizationId, sEventId, false);
        triggerReportsRemoveUpdate();
        navigate('/Reports');
        setReportMessage("The reported event has been ignored");
    }

    /*F+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Function: fnHandleEventReportIgnore
  
    Summary: front end passes true variable to backend in order to change value of event_status to reflect removal
  
    Args: Args: The id of the organization that has the event that is reported
          and the id of the event (host_id & event_id)
  
    Returns: None
    -------------------------------------------------------------------F*/
    async function fnHandleEventReportRemove(sOrganizationId, sEventId) {
        await fnHandleEventReport(sOrganizationId, sEventId, true);
        triggerReportsRemoveUpdate();
        navigate('/Reports');
        setReportMessage("The reported event has been removed");


        
    }




    return (
        
        <div className="ReportPageContainer">
            <div className="ReportFromContainer">
                <div className="TopElementContainer">
                    <div className="TopHtmlBlock">
                        Title: {aoReportData.state.data.event_name}
                        <br></br>
                        Posted From: {aoReportData.state.data.host.organization_name}
                        <br></br>
                        Posted On: { moment( aoReportData.state.data.event_timestamp.seconds * 1000 + aoReportData.state.data.event_timestamp.nanoseconds / 1000000 ).format("dddd, MMMM Do YYYY, h:mm a")  }
                        <br></br>
                        Location: {aoReportData.state.data.location.location_name}
                        <br></br>
                        {aoReportData.state.data.event_status > 0 ? 
                                <div>Status: Public</div>
                                :
                                <div>Status: Private </div>
                            }
                        {aoReportData.state.data.event_reports > 1 ? 
                                <div>{aoReportData.state.data.event_reports} Reports Recieved</div>
                                :
                                <div>{aoReportData.state.data.event_reports} Report Recieved </div>
                            }
                    </div>
                </div>
                
                <div className="MiddleElementContainer">
                    <div className="MiddleHtmlBlock">
                        Content:
                        <p className="ReportContentP">
                            {aoReportData.state.data.event_description}
                        </p>
                    </div>
                </div>

                <div className="BottomElementContainer">
                    <button className="IgnoreButton" onClick={() => fnHandleEventReportIgnore(aoReportData.state.data.host_id, aoReportData.state.data.event_id)}>Ignore</button>
                    <div className="ReportButtonSpacing"> </div>
                    <button className="RemoveButton" onClick={() => fnHandleEventReportRemove(aoReportData.state.data.host_id, aoReportData.state.data.event_id)}>Remove</button>
                </div>
                <div className="ReportMessage"> <br></br>{sReportMessage} </div>

            </div>

        </div>
        
    );

}

export default  ReportsExpand;
