import React from 'react';
import {render, screen, fireEvent, waitFor, cleanup} from '@testing-library/react';
import { BrowserRouter} from 'react-router-dom';
import Login from "../Login";
import NavBar from "../NavBar";
import 'mutationobserver-shim';
import { fnLogout } from '../LoginFunctions';

afterEach(cleanup);
describe("OrgOfficerPageTesting", () => {

    /*T+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Test: Organizations page Elements For the Officer

      Target: Organizations

      Assertions: On screen element of the event name loads, orgevent is shown 

      Writer: Sam Merlin 2/25/2023 SP-270 SP-275
    -------------------------------------------------------------------T*/

test("Organizations page officer ", async () => {
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

  fireEvent.change(oInputElementEmail, { target: { value: "teststatic_officer@teststatic.edu"} });
  fireEvent.change(oInputElementPassword, { target: { value: "test123"} });
  fireEvent.click(oSubmitButton);


  const OrgName =  await waitFor( () => screen.getByText('TestStatic_Org1'), { timeout: 8000 });
  const oOrgButton = screen.getByTestId("linkerton");
  fireEvent.click(oOrgButton); 
  const linkOne =  await waitFor( () => screen.getByRole('link', {name: /officer/i}), { timeout: 8000 }); 
  fireEvent.click(linkOne);

  const EventRequestItem = await waitFor( () => screen.findByText("teststatic_officer@teststatic.edu"), { timeout: 8000 });
  expect (EventRequestItem).toBeInTheDocument();

  await fnLogout();
});
});
