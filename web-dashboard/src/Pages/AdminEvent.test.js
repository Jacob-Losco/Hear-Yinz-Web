import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import {render, screen, fireEvent, waitFor, } from '@testing-library/react';
import NavBar from '../NavBar';
import Login from "../Login";
import { fnLogin, fnLogout } from '../LoginFunctions';
import AdminEvent from "./Requests"


import 'mutationobserver-shim';
import { fnCreateEvent } from '../DBFunctions';




    /*T+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Test: Requests exist in Admin Event Requests page

      Target: AdminEvents

      Assertions: Event Requests dispay on the Admin Event Page.

      Writer: Philip Pavlick - 2/20/23 - SP 389
//     -------------------------------------------------------------------T*/
// describe("Admin Events exist testing ", () => { 


//     test("Requests exist in Admin Event Requests page", async () => {
//         jest.setTimeout(30000)
//         render(
//             <NavBar />, 
//             { wrapper: BrowserRouter},
//             <Login
//             button
//             fnSetLoginEmail={()=>{}}
//             LoginPassword={[]}
//             fnSetLoginPassword={()=>{}}/>

//         );

//         const oSubmitButton = screen.getByRole('button',{name: /log in/i}); 
//         const oInputElementEmail = screen.getByPlaceholderText(/email/i);
//         const oInputElementPassword = screen.getByPlaceholderText(/password/i);

//         fireEvent.change(oInputElementEmail, { target: { value: "teststatic_admin@teststatic.edu"} });
//         fireEvent.change(oInputElementPassword, { target: { value: "test123"} });
//         fireEvent.click(oSubmitButton); 


//         const organizationsLink = await waitFor( () => screen.findByText("Requests"), { timeout: 8000 });

//         const oRequestsButton = screen.getByRole('link', {name: /requests/i}); 
//         fireEvent.click(oRequestsButton);

//         const RequestEventLink = await waitFor( () => screen.findByText("Events"), { timeout: 12000 });
//         const oRequestsEventButton = screen.getByRole('link', {name: /Events/i}); 
//         fireEvent.click(oRequestsEventButton);


//         const EventRequestItem = await waitFor( () => screen.findByText("TestStatic_Event6"), { timeout: 8000 });
//         expect (EventRequestItem).toBeInTheDocument();

//         await fnLogout();


//       });
// });


describe("Admin Event Approve and Deny", () => {
  
  test("Test that event approve rerenders page and that approved event isn't in the render", async () => { 
    // Create an event
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

        fireEvent.change(oInputElementEmail, { target: { value: "testdynamic_admin@testdynamic.edu"} });
        fireEvent.change(oInputElementPassword, { target: { value: "test123"} });
        fireEvent.click(oSubmitButton); 

        const oReportNotification = await waitFor( () => screen.findByText("2"), { timeout: 11000 });
        screen.debug();


    const error = fnCreateEvent("QOdUVPgaDzlWp05WlL92", {
      event_description: "TEST FUCKER",
      event_name: "TEST FUCK YOU PHILIP",
      event_status: 1,
      event_timestamp: new Date(),
      event_location: "qGDMAJOgE70n3yJlsjqZ"
    });

    expect (error).not.toBeNull


    // render and approve event and test it goes away
    // delete event from firebase
  })

});