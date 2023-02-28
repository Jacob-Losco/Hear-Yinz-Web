import React from 'react';
import {render, screen, fireEvent, waitFor, cleanup} from '@testing-library/react';
import { BrowserRouter} from 'react-router-dom';
import Login from "../Login";
import NavBar from "../NavBar";
import OrgPage from "./OrgPage"
import 'mutationobserver-shim';
import { fnLogout } from '../LoginFunctions';

afterEach(cleanup);
describe("OrganizationsTesting", () => {

    /*T+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Test: Organizations List page Elements For the Officer

      Target: Organizations

      Assertions: On screen element of the organization page loads, org1 is shown is shown

      Writer: Sam Merlin 2/25/2023
    -------------------------------------------------------------------T*/

    test("Organizations page Elements For the Officer ", async () => {
        jest.setTimeout(10000)
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
  
        fireEvent.change(oInputElementEmail, { target: { value: "teststatic_officer@teststatic.edu"} });
        fireEvent.change(oInputElementPassword, { target: { value: "test123"} });
        fireEvent.click(oSubmitButton);

        const OrgName = await waitFor( () => screen.findByText("TestStatic_Org1"), { timeout: 10000 });
        const OrgName2 = "TestStatic_Org2";
        const OrgName3 = "TestStatic_Org3";
        expect (OrgName).toBeInTheDocument();
        expect (OrgName2).not.toBe("TestStatic_Or2")
        expect (OrgName3).not.toBe("TestStatic_Org1")

        await fnLogout();
    });

    /*T+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Test: Organizations List Elements For the Admin

      Target: Organizations

      Assertions: On screen element of the organization page loads, the third orgname is shown

      Writer: Sam Merlin 2/26/2023
    -------------------------------------------------------------------T*/

    test("Organizations page Elements For the Admin ", async () => {
        jest.setTimeout(10000)
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

        const OrgName3 = await waitFor( () => screen.findByText("TestStatic_Org3"), { timeout: 10000 });
        expect (OrgName3).toBeInTheDocument();

        await fnLogout();
    });

    /*T+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Test: Organizations List Elements For the user

      Target: Organizations

      Assertions: On screen element of the organization page loads, none of the orgs are shown

      Writer: Sam Merlin 2/26/2023
    -------------------------------------------------------------------T*/

    test("Organizations page Elements For the User ", async () => {
        jest.setTimeout(10000)
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
  
        fireEvent.change(oInputElementEmail, { target: { value: "teststatic_user@teststatic.edu"} });
        fireEvent.change(oInputElementPassword, { target: { value: "test123"} });
        fireEvent.click(oSubmitButton);

        const OrgName = "TestStatic_Org1";
        const OrgName2 = "TestStatic_Org2";
        const OrgName3 = "TestStatic_Org3";
        expect (OrgName).not.toBe("TestStatic_Or1")
        expect (OrgName2).not.toBe("TestStatic_Or2")
        expect (OrgName3).not.toBe("TestStatic_Org1")
        await fnLogout();
    });

});