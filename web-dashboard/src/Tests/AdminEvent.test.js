import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {render, screen, fireEvent, waitFor, } from '@testing-library/react';
import NavBar from '../NavBar';
import Login from "../Login";
import { fnLogout } from '../LoginFunctions';


import 'mutationobserver-shim';
    /*T+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Test: Requests exist in Admin Event Requests page

      Target: AdminEvents

      Assertions: Event Requests dispay on the Admin Event Page.

      Writer: Philip Pavlick - 2/20/23 - SP 389
    -------------------------------------------------------------------T*/
describe("Admin Event testing", () => { 
    test("Requests exist in Admin Event Requests page", async () => {
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
        const oRequestsEventButton = screen.getByRole('link', {name: /Events/i}); 
        fireEvent.click(oRequestsEventButton);


        const EventRequestItem = await waitFor( () => screen.findByText("TestStatic_Event6"), { timeout: 8000 });
        expect (EventRequestItem).toBeInTheDocument();

        await fnLogout();
      });
});