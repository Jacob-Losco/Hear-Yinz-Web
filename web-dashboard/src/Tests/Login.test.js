/*+===================================================================
File: Login.test.js

Summary: Some tests for the consts inside the login function, testing input

Exported Data Structures: None

Exported Functions: None

Contributors:
	Samuel Merlin - 2/3/2023 - SP-341

===================================================================+*/
import {render, screen, fireEvent} from "@testing-library/react";
import React from "react";
import Login from "../Login";
import { oAuthentication } from "../firebase-config";

    /*T+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Test: Login sucess oAuth is not null

      Target: Login Form

      Assertions: input can be entered into both form boxes
        there is a user logged in are clicking the login button

      Writer: Sam Merlin
    -------------------------------------------------------------------T*/
    test("Login success oAuth is not null",  () => {
        render(
            <Login
            button
            fnSetLoginEmail={()=>{}}
            LoginPassword={[]}
            fnSetLoginPassword={()=>{}}/>
            );

        const oSubmitButton = screen.getByRole('button');
        const oInputElementEmail = screen.getByPlaceholderText(/email/i);
        const oInputElementPassword = screen.getByPlaceholderText(/password/i);

        fireEvent.change(oInputElementEmail, { target: { value: "test@stvincent.edu"} });
        fireEvent.change(oInputElementPassword, { target: { value: "test123"} });
        fireEvent.click(oSubmitButton);

        expect(oInputElementEmail.value).toBe("test@stvincent.edu")
        expect(oInputElementPassword.value).toBe("test123");
        !expect(oAuthentication.currentUser).toBeNull;
    });

    /*T+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Test: Login fail html is displayed

      Target: Login Form

      Assertions: input can be entered into both form boxes
        error message is displayed when login fails

      Writer: Sam Merlin
    -------------------------------------------------------------------T*/
    test("Login fail html is diplayed",  () => {
        render(
            <Login
            button
            fnSetLoginEmail={()=>{}}
            LoginPassword={[]}
            fnSetLoginPassword={()=>{}}/>
            );

        const oSubmitButton = screen.getByRole('button');
        const oInputElementEmail = screen.getByPlaceholderText(/Email/i);
        const oInputElementPassword = screen.getByPlaceholderText(/Password/i);

        const oHtmlElement = screen.queryByTestId('Message');

        fireEvent.change(oInputElementEmail, { target: { value: "Some Text"} })
        fireEvent.change(oInputElementPassword, { target: { value: "Some Text"} })
        fireEvent.click(oSubmitButton);

        expect(oHtmlElement).toBeDefined();
        
    });
