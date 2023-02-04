import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { oAuthentication } from "./firebase-config";

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

test("Authentication with sign out", async () => {
    const user = await signInWithEmailAndPassword(oAuthentication, 'test@stvincent.edu', 'test123');
    !expect(user.user).toBeNull;
    await signOut(oAuthentication);
    expect(user.user).toBeNull;
});