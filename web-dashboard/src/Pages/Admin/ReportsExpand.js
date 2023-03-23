/*+===================================================================
File: ReportExpand.js

Summary: Host content for the Expanded Report

Exported Data Structures: None

Exported Functions: ReportExpand

Contributors:
	Philip Pavlick - 3/18/23 SP-305,306,307

===================================================================+*/

import React from "react";
import { useLocation } from "react-router-dom";
import moment from 'moment';
import "../../Styles/ReportsExpand.css"


export default function ReportsExpand ()  {
        const aoReportData = useLocation();
        console.log(aoReportData)
    return (
        
        <div className="ReportPageContainer">
            <div className="ReportFromContainer">
                <div className="TopElementContainer">
                    <div className="TopHtmlBlock" data-testid="ReportExpandElement">
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
                    <button className="IgnoreButton">Ignore</button>
                    <div className="ReportButtonSpacing"> </div>
                    <button className="RemoveButton">Remove</button>
                </div>


            </div>

        </div>
        
    );

}