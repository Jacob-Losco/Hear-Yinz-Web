import React from 'react';
import {render, screen, fireEvent, waitFor, cleanup} from '@testing-library/react';
import { BrowserRouter} from 'react-router-dom';
import Login from "../Login";
import 'mutationobserver-shim';
import Organizations from "./Organizations"
import OrgPage from "./OrgPage"
import { fnLogout } from '../LoginFunctions';

afterEach(cleanup);
describe("OrganizationPageTesting", () => {


    
    /*T+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Test: Organizations page Elements

      Target: Organizations, OrgPage

      Assertions: On screen element of the organization page loads

      Writer: Sam Merlin 2/25/2023
    -------------------------------------------------------------------T*/

    test("OrgElement On Screen ", async () => {
        jest.setTimeout(30000);
        render(
            <Login/>,
            <Organizations/>,
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

        const oReportNotification = await waitFor( () => screen.findByText("2"), { timeout: 8000 }); // Timeout might have to be toggled. findByText is required for async queries. 
        expect(oReportNotification).toBeInTheDocument();
        const OrgName = await waitFor( () => screen.findByText(/teststatic_org1/i), { timeout: 10000 });
        expect (OrgName).toBeInTheDocument();
        expect (OrgName.href).toContain("/OrgPage");
        jest.setTimeout(10000);
        await fnLogout();
    });

    // test("OrgPage load navbar elements", async () => {
    //     render(
    //         <MemoryRouter initialEntries={[{ pathname: 'OrgPage', search: '?value=OrgInfo' }]}>
    //         <OrgPage />
    //       </MemoryRouter>
    //     );
    // });


});

