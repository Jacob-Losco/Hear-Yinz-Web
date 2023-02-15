
import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import Login from "./Login";
import 'mutationobserver-shim';



describe("NavBar naviation link testing", () => {

    /*T+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Test: Organizations page link testing

      Target: Navbar

      Assertions: link can be seen in navbar
        link takes user to /Organizations

      Writer: Phil Pavlick
    -------------------------------------------------------------------T*/
    test("Organizations page link testing ", async () => {
        render(<NavBar />, { wrapper: BrowserRouter });
        const organizationsLink = screen.getByText("Organizations");
        expect(organizationsLink).toBeInTheDocument();
        expect(organizationsLink.href).toContain("/Organizations");
    });

    /*T+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Test: Requests page link testing

      Target: Navbar

      Assertions: link can be seen in navbar
        link takes user to /Requests

      Writer: Phil Pavlick
    -------------------------------------------------------------------T*/
    test("Requests page link testing", async () => {
        render(<NavBar />, { wrapper: BrowserRouter });
        const organizationsLink = screen.getByText("Requests");
        expect(organizationsLink).toBeInTheDocument();
        expect(organizationsLink.href).toContain("/Requests");
    });

    /*T+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Test: Reports page link testing

      Target: Navbar

      Assertions: link can be seen in navbar
        link takes user to /Organizations

      Writer: Phil Pavlick
    -------------------------------------------------------------------T*/
    test("Reports page link testing", async () => {
        render(<NavBar />, { wrapper: BrowserRouter });
        const organizationsLink = screen.getByText("Reports");
        expect(organizationsLink).toBeInTheDocument();
        expect(organizationsLink.href).toContain("/Reports");
    });
});



describe("Report Notifications", () => {

  test("Reports Notification Exists", async () => {
  render(<NavBar />, { wrapper: BrowserRouter });

  const number = screen.getByTitle("ReportNotification");
  const oReportNotification = screen.getByTitle("ReportNotification", {name: 0});
  expect(number).toHaveTextContent(0);
});


// test("Report Notification Count when user not sign in", async () => {
    
    
//   render(
//     <NavBar />, 
//     { wrapper: BrowserRouter},
//     <Login
//     button
//     fnSetLoginEmail={()=>{}}
//     LoginPassword={[]}
//     fnSetLoginPassword={()=>{}}/>
//     );
    
//   const oSubmitButton = screen.getByRole('button',{name: /log in/i});
//   const oInputElementEmail = screen.getByPlaceholderText(/email/i);
//   const oInputElementPassword = screen.getByPlaceholderText(/password/i);

//   fireEvent.change(oInputElementEmail, { target: { value: "teststatic_officer@teststatic.edu"} });
//   fireEvent.change(oInputElementPassword, { target: { value: "test123"} });
//   fireEvent.click(oSubmitButton);

//   const oReportNotification = await waitFor( () => screen.findByText("0")); // should be 3
//  const NewoReportNotification = await waitFor( () => screen.findByText("3"), { timeout: 8000 });
//   expect(oReportNotification).toBeInTheDocument();
//  expect(NewoReportNotification).toBeInTheDocument();

// });




});


test("Report Notification Count when user not sign in", async () => {
    
    
  render(
    <NavBar />, 
    { wrapper: BrowserRouter},
    <Login
    button
    fnSetLoginEmail={()=>{}}
    LoginPassword={[]}
    fnSetLoginPassword={()=>{}}/>
    );
    
  //const oSubmitButton = screen.getByRole('button',{name: /log in/i});
  const oInputElementEmail = screen.getByPlaceholderText(/email/i);
  const oInputElementPassword = screen.getByPlaceholderText(/password/i);
  const oSignOutButton = screen.getByRole('button', {name: /logout/i});

  fireEvent.change(oInputElementEmail, { target: { value: "l"} });
  fireEvent.change(oInputElementPassword, { target: { value: "l"} });
  fireEvent.click(oSignOutButton);
 // fireEvent.click(oSubmitButton);

//   const oReportNotification = await waitFor( () => screen.findByText("0")); // should be 3
//  const NewoReportNotification = await waitFor( () => screen.findByText("0"), { timeout: 8000 });
//   expect(oReportNotification).toBeInTheDocument();
//  expect(NewoReportNotification).toBeInTheDocument();

});