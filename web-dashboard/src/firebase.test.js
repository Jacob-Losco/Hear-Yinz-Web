/*+===================================================================
File: firebase-test.test.js

Summary: Tests for checking firebase authentication

Exported Data Structures: None

Exported Functions: None

Contributors:
    Jacob Losco - 2/7/2023 - SP220

===================================================================+*/

import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { oAuthentication } from "./firebase-config";

/*T+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Test: Authentication with login

      Target: FnLogin

      Assertions: errors out with invalid input
        the current auth user session is not null with valid input

      Writer: Jacob Losco
    -------------------------------------------------------------------T*/
test("Authentication with login", async () => {
    let sError = '';

    try {
        await signInWithEmailAndPassword(oAuthentication, 'notanemail@stvincent.edu', '1');
    } catch (err) {
        sError = err.toString();
    }

    expect(sError).toEqual("FirebaseError: Firebase: Error (auth/user-not-found).");

    const oUser = await signInWithEmailAndPassword(oAuthentication, 'test@stvincent.edu', 'test123');
    !expect(oUser.user).toBeNull
});

/*T+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      Test: Authentication with sign out

      Target: FnLogout

      Assertions: user is logged in successfully, then user is logged out successfully

      Writer: Jacob Losco
    -------------------------------------------------------------------T*/
test("Authentication with sign out", async () => {
    const oUser = await signInWithEmailAndPassword(oAuthentication, 'test@stvincent.edu', 'test123');
    !expect(oUser.user).toBeNull;
    await signOut(oAuthentication);
    expect(oUser.user).toBeNull;
});