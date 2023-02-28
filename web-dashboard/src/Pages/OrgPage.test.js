import React from 'react';
import {render, screen, fireEvent, waitFor, cleanup} from '@testing-library/react';
import { BrowserRouter} from 'react-router-dom';
import Login from "../Login";
import NavBar from "../NavBar";
import 'mutationobserver-shim';
import { fnLogout } from '../LoginFunctions';


afterEach(cleanup);
describe("OrganizationsTesting", () => {

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

  const OrgButton = await waitFor( () => screen.getByTestId('linkerton'), { timeout: 10000 });
  fireEvent.click(OrgButton);

  const OrgName = await waitFor( () => screen.findByText("TestStatic_Org1"), { timeout: 10000 });
  expect (OrgName).toBeInTheDocument();
  await fnLogout();
});

// test("Organizations page Elements For the Officer ", async () => {
//   jest.setTimeout(30000)
//   render(
//   <NavBar />, 
//   { wrapper: BrowserRouter},
//   <Login
//   button
//   fnSetLoginEmail={()=>{}}
//   LoginPassword={[]}
//   fnSetLoginPassword={()=>{}}/>
//   );
   
//   const oSubmitButton = screen.getByRole('button',{name: /log in/i}); 
//   const oInputElementEmail = screen.getByPlaceholderText(/email/i);
//   const oInputElementPassword = screen.getByPlaceholderText(/password/i);

//   fireEvent.change(oInputElementEmail, { target: { value: "teststatic_admin@teststatic.edu"} });
//   fireEvent.change(oInputElementPassword, { target: { value: "test123"} });
//   fireEvent.click(oSubmitButton);

//   const OrgButton = await waitFor( () => screen.getAllByTestId('linkerton'), { timeout: 10000 });
//   fireEvent.click(OrgButton);

//   const OrgName = await waitFor( () => screen.findByText("TestStatic_Org3"), { timeout: 10000 });
//   expect (OrgName).toBeInTheDocument();
//   await fnLogout();

  // });
});