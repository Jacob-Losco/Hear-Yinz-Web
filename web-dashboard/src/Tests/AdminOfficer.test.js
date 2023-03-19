import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {render, screen, fireEvent, waitFor, } from '@testing-library/react';
import NavBar from '../NavBar';
import Login from "../Login";
import { fnLogout } from '../LoginFunctions';
import 'mutationobserver-shim';
 
describe("Admin Officer testing", () => { 
    /*T+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Test: Requests exist in Admin Officer Requests page

      Target: AdminOfficer

      Assertions: Officer Requests dispay on the Admin Officer Page.

      Writer: Philip Pavlick - 3/6/23 - SP-393
    -------------------------------------------------------------------T*/
    test("Requests exist in Admin Officer Requests page", async () => {
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


        const organizationsLink = await waitFor( () => screen.findByText("Requests"), { timeout: 8000 });

        const oRequestsButton = screen.getByRole('link', {name: /requests/i}); 
        fireEvent.click(oRequestsButton);

        const RequestEventLink = await waitFor( () => screen.findByText("Events"), { timeout: 12000 });
        const oRequestsEventButton = screen.getByRole('link', {name: /Officer/i}); 
        fireEvent.click(oRequestsEventButton);


        const EventRequestItem = await waitFor( () => screen.findByText("teststatic_officer@teststatic.edu"), { timeout: 8000 });
        expect (EventRequestItem).toBeInTheDocument();

        await fnLogout();
        const UserSignedOut = await waitFor( () => screen.findByText("Admin Dashboard"), { timeout: 12000 });
      });
});