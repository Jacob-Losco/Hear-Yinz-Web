import React from 'react';
import {render, screen, fireEvent, waitFor, cleanup} from '@testing-library/react';
import { BrowserRouter} from 'react-router-dom';
import Login from "../Login";
import NavBar from "../NavBar";
import 'mutationobserver-shim';
import { fnLogout } from '../LoginFunctions';

afterEach(cleanup);
describe("OrgEventTesting", () => {

    /*T+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Test: Organizations page Elements For the Officer

      Target: Organizations

      Assertions: On screen element of the event name loads, orgevent is shown 

      Writer: Sam Merlin 2/25/2023 SP-270
    -------------------------------------------------------------------T*/

test("Organizations page Elements For the Officer ", async () => {
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
  const oOrgButton = screen.getByAltText("orgImg");
  fireEvent.click(oOrgButton); fireEvent.click(oOrgButton); fireEvent.click(oOrgButton); fireEvent.click(oOrgButton);
  fireEvent.click(oOrgButton); fireEvent.click(oOrgButton); fireEvent.click(oOrgButton);
  const OrgName1 =  await waitFor( () => screen.getByText('TestStatic_Org1'), { timeout: 8000 });
  const oRequestsEventButton = screen.getByRole('link', {name:' Events'}); 
  fireEvent.click(oRequestsEventButton);

  const AddEvent =  await waitFor( () => screen.getByTestId('LinkertonTwo'), { timeout: 9000 });
  AddEvent.click(oOrgButton);

  const OrgID =  await waitFor( () => screen.getByText('e9ovh7zgJisTDihMbNCA'), { timeout: 8000 });
  expect (OrgID).toBeInTheDocument();
  await fnLogout();
});
});