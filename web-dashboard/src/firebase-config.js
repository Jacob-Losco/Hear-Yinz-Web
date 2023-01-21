import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
require("dotenv").config();

const firebaseConfig = {
    apiKey: process.env.FirebaseAPIKey,
    authDomain: process.env.FirebaseAuthDomain,
    projectId: "hear-yinz",
    storageBucket: process.env.FirebaseStorageBucket,
    messagingSenderId: process.env.FirebaseMessagingSenderId,
    appId: process.env.FirebaseAppId,
    measurementId: process.env.FirebaseMeasurementId
  };

  const app = initializeApp(firebaseConfig);

  export const db = getFirestore()