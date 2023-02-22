/*+===================================================================
File: firebase-config.js

Summary: Configures and intitialize firebase functionality

Exported Data Structures: oFirestore - object for accessing firestore database
  oAuthentication - object for using firebase authentication
  oStorage - object for accessing firebase storage

Exported Functions: None

Contributors:
	Jacob Losco - 02/17/23 - SP-475

===================================================================+*/

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