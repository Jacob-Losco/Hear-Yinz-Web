import React from "react";
import "../../Styles/ReportsExpand.css"


export default function ReportsExpand ()  {
    return (
        <div className="ReportPageContainer">
            <div className="ReportFromContainer">
                <div className="TopElementContainer">
                    <div className="TopHtmlBlock">
                        Posted From: Test Club
                        <br></br>
                        Posted On: 1/5/2023
                        <br></br>
                        Location: W214 Dupre
                        <br></br>
                        Status: Private 
                        <br></br>
                        5 Reports Recieved
                    </div>
                </div>
                
                <div className="MiddleElementContainer">
                    <div className="MiddleHtmlBlock">
                        Content:
                        <p className="ReportContentP">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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