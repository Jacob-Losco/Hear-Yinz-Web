import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";
require("dotenv").config();

const oFirebaseConfig = {
    apiKey: "AIzaSyB9EFBM_xBA2N4MSB4DXmzH80kHn4fcYYA",
    authDomain: process.env.FirebaseAuthDomain,
    projectId: "hear-yinz",
    storageBucket: process.env.FirebaseStorageBucket,
    messagingSenderId: process.env.FirebaseMessagingSenderId,
    appId: process.env.FirebaseAppId,
    measurementId: process.env.FirebaseMeasurementId
  };

  const oFirebaseApp = initializeApp(oFirebaseConfig);

  export const oFirestore = getFirestore();
  export const oAuthentication = getAuth(oFirebaseApp);
  export const oStorage = getStorage(oFirebaseApp, "gs://hear-yinz.appspot.com/");