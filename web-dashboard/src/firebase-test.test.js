import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { oAuthentication } from "./firebase-config";

test("Authentication with login", async () => {
    let sError = '';

    try {
        await signInWithEmailAndPassword(oAuthentication, 'notanemail@stvincent.edu', '1');
    } catch (err) {
        sError = err.toString();
    }

    expect(error).toEqual("FirebaseError: Firebase: Error (auth/user-not-found).");

    const oUser = await signInWithEmailAndPassword(oAuthentication, 'test@stvincent.edu', 'test123');
    !expect(oUser.user).toBeNull
});

test("Authentication with sign out", async () => {
    const oUser = await signInWithEmailAndPassword(oAuthentication, 'test@stvincent.edu', 'test123');
    !expect(oUser.user).toBeNull;
    await signOut(oAuthentication);
    expect(oUser.user).toBeNull;
});