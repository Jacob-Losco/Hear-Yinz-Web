import React from "react";
import {render, screen, fireEvent, waitFor, } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../NavBar';
import Login from "../Login";
import { fnLogout } from '../LoginFunctions';
import 'mutationobserver-shim';



describe("Report Testing", () => { 

    /*T+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Test: Report page Elements For the Report

      Target: Report Page

      Assertions: On screen element of the Report page loads

      Writer: Philip Pavlick 3/18/23 SP-485
    -------------------------------------------------------------------T*/


    test("Test that elements exist withing report page", async () => {
        jest.setTimeout(30000)
        render(
            <NavBar />, 
            { wrapper: BrowserRouter},
            <Login
            button
            fnSetLoginEmail={()=>{}}
            LoginPassword={[]}
            fnSetLoginPassword={()=>{}}/>

        );

        const oSubmitButton = screen.getByRole('button',{name: /log in/i}); 
        const oInputElementEmail = screen.getByPlaceholderText(/email/i);
        const oInputElementPassword = screen.getByPlaceholderText(/password/i);

        fireEvent.change(oInputElementEmail, { target: { value: "teststatic_admin@teststatic.edu"} });
        fireEvent.change(oInputElementPassword, { target: { value: "test123"} });
        fireEvent.click(oSubmitButton); 


        const reportsLink = await waitFor( () => screen.findByText("Reports"), { timeout: 8000 });

        const oReportButton = screen.getByRole('link', { name: /reports/i })
        fireEvent.click(oReportButton);

         const RecievedReport = await waitFor( () => screen.getByTestId("Reports333"), { timeout: 12000 });
         expect (RecievedReport).toBeInTheDocument();

        await fnLogout();
        const UserSignedOut = await waitFor( () => screen.findByText("Admin Dashboard"), { timeout: 12000 });




      });



 


    
});