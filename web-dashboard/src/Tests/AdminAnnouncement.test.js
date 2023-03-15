import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {render, screen, fireEvent, waitFor, } from '@testing-library/react';
import NavBar from '../NavBar';
import Login from "../Login";
import { fnLogout } from '../LoginFunctions';
import AdminEvent from "../Pages/Requests"


import 'mutationobserver-shim';




    /*T+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Test: Requests exist in Admin Event Requests page

      Target: AdminEvents

      Assertions: Event Requests dispay on the Admin Event Page.

      Writer: Philip Pavlick - 3/2/23 - SP 391
    -------------------------------------------------------------------T*/
describe("Admin Announcement testing", () => { 


    test("Announcement Request exist in Admin Announcement Requests page", async () => {
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
        const oRequestsEventButton = screen.getByRole('link', {name: /Announcements/i}); 
        fireEvent.click(oRequestsEventButton);


        const EventRequestItem = await waitFor( () => screen.findByText("the message for the first announcement created by TestStatic_Org3"), { timeout: 8000 });
        expect (EventRequestItem).toBeInTheDocument();

        await fnLogout();
        const UserSignedOut = await waitFor( () => screen.findByText("Admin Dashboard"), { timeout: 12000 });



      });



 


    
});