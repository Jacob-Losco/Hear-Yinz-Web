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
import { signInWithEmailAndPassword} from 'firebase/auth';
import { oAuthentication } from "./firebase-config";

    it('should be able type into email input', () =>{
        render(
            <Login
                sLoginEmail={[]}
                fnSetLoginEmail={()=>{}}
                sLoginPassword={[]}
                fnSetLoginPassword={()=>{}}
         />
         );
        const inputElement = screen.getByPlaceholderText(/Email/i);
        const inputElement2 = screen.getByPlaceholderText(/Password/i);
        fireEvent.change(inputElement2, { target: { value: "Some Text"} })
        fireEvent.change(inputElement, { target: { value: "Some Text"} })
        expect(inputElement2.value).toBe("Some Text");
        expect(inputElement.value).toBe("Some Text");
    })

    test("Authentication with login", async () => {
        let error = '';
    
        try {
            await signInWithEmailAndPassword(oAuthentication, 'notanemail@stvincent.edu', '1');
        } catch (err) {
            error = err.toString();
        }
    
        expect(error).toEqual("FirebaseError: Firebase: Error (auth/user-not-found).");
    
        const user = await signInWithEmailAndPassword(oAuthentication, 'test@stvincent.edu', 'test123');
        !expect(user.user).toBeNull
    });