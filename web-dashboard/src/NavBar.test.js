
import React from 'react';
import {render, screen, fireEvent, waitFor, cleanup} from '@testing-library/react';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { oAuthentication } from "./firebase-config";
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import Login from "./Login";
import 'mutationobserver-shim';
import { fnLogout } from './LoginFunctions';

afterEach(cleanup);

describe("NavBar naviation link testing", () => {

    /*T+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Test: Organizations page link testing

      Target: Navbar

      Assertions: link can be seen in navbar
        link takes user to /Organizations

      Writer: Phil Pavlick
    -------------------------------------------------------------------T*/
    test("Organizations page link testing ", async () => {
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

      const organizationsLink = await waitFor( () => screen.findByText("Organizations"), { timeout: 8000 });
      expect(organizationsLink).toBeInTheDocument();
      expect(organizationsLink.href).toContain("/Organizations");
      await fnLogout();
    });

    /*T+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Test: Requests page link testing

      Target: Navbar

      Assertions: link can be seen in navbar
        link takes user to /Requests

      Writer: Phil Pavlick
    -------------------------------------------------------------------T*/
    test("Requests page link testing", async () => {
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
      expect(organizationsLink).toBeInTheDocument();
      expect(organizationsLink.href).toContain("/Requests");
      await fnLogout();
    });

    // /*T+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //   Test: Reports page link testing

    //   Target: Navbar

    //   Assertions: link can be seen in navbar
    //     link takes user to /Organizations

    //   Writer: Phil Pavlick
    // -------------------------------------------------------------------T*/
    test("Report link visible when logged into admin", async () => {
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

      const organizationsLink = await waitFor( () => screen.findByText("Reports"), { timeout: 8000 });
      expect(organizationsLink).toBeInTheDocument();
      expect(organizationsLink.href).toContain("/Reports");
      await fnLogout();
    });

    /*T+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Test: Report Notification testing

      Target: Navbar report notification

      Assertions: report notification bubble can be seen when an admin user who has outstanding reports signs in

      Writer: Phil Pavlick
    -------------------------------------------------------------------T*/
    test("Report Notification Count when user is signed in", async () => {
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

      const oReportNotification = await waitFor( () => screen.findByText("3"), { timeout: 8000 }); // Timeout might have to be toggled. findByText is required for async queries. 
      expect(oReportNotification).toBeInTheDocument();

    });
});
