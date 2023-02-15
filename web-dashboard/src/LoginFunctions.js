/*+===================================================================
File: LoginFunctions.js

Summary: A set of functions that handle user authenticaiton

Exported Data Structures: None

Exported Functions: fnLogin - attempts to log the user into the application
                fnLogout - attempts to log the user out of the application
                

Contributors:
	Jacob Losco - 02/11/23 - SP-341

===================================================================+*/

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { oAuthentication } from './firebase-config';

export async function fnLogin(sEmail, sPassword) {
    try {
        await signInWithEmailAndPassword(
            oAuthentication, 
            sEmail, 
            sPassword
        );
    } catch (error) {
        console.error(error);
        return error;
    }
}

export async function fnLogout() {
    try {
        await signOut(oAuthentication);
    } catch (error) {
        console.error(error);
        return error;
    }
};