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
import Login from "./Login";
import { oAuthentication } from "./firebase-config";

    test("Login success oAuth is not null",  () => {
        render(
            <Login
            button
            fnSetLoginEmail={()=>{}}
            LoginPassword={[]}
            fnSetLoginPassword={()=>{}}/>
            );

        const submitButton = screen.getByRole('button');
        const inputElementEmail = screen.getByPlaceholderText(/email/i);
        const inputElementPassword = screen.getByPlaceholderText(/password/i);

        fireEvent.change(inputElementEmail, { target: { value: "test@stvincent.edu"} });
        fireEvent.change(inputElementPassword, { target: { value: "test123"} });
        fireEvent.click(submitButton);

        expect(inputElementEmail.value).toBe("test@stvincent.edu")
        expect(inputElementPassword.value).toBe("test123");
        !expect(oAuthentication.currentUser).toBeNull;
    });

    test("Login fail html is diplayed",  () => {
        render(
            <Login
            button
            fnSetLoginEmail={()=>{}}
            LoginPassword={[]}
            fnSetLoginPassword={()=>{}}/>
            );

        const submitButton = screen.getByRole('button');
        const inputElementEmail = screen.getByPlaceholderText(/Email/i);
        const inputElementPassword = screen.getByPlaceholderText(/Password/i);

        const htmlElement = screen.queryByTestId('Message');

        fireEvent.change(inputElementEmail, { target: { value: "Some Text"} })
        fireEvent.change(inputElementPassword, { target: { value: "Some Text"} })
        fireEvent.click(submitButton);

        expect(htmlElement).toBeDefined();
        });
