
import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import Organizations from './Organizations';
import Login from '../Login';
import NavBar from '../NavBar';
import 'mutationobserver-shim';
import { fnLogout } from '../LoginFunctions';
import { BrowserRouter } from 'react-router-dom';

test("Organizations OrgNAme button test", async () => {
    render(
      <NavBar />, 
      { wrapper: BrowserRouter},
      <Login
      button
      fnSetLoginEmail={()=>{}}
      LoginPassword={[]}
      fnSetLoginPassword={()=>{}}/>,
      <Organizations/>
      );
      
    const oSubmitButton = screen.getByRole('button',{name: /log in/i}); 
    const oInputElementEmail = screen.getByPlaceholderText(/email/i);
    const oInputElementPassword = screen.getByPlaceholderText(/password/i);
  
    fireEvent.change(oInputElementEmail, { target: { value: "teststatic_admin@teststatic.edu"} });
    fireEvent.change(oInputElementPassword, { target: { value: "test123"} });
    fireEvent.click(oSubmitButton);

    const orgName = screen.getByTestId(/leftNavigation/i);
    expect(orgName).toBeInTheDocument();
    await fnLogout();
});