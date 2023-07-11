import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import {
  getFirestore,
  doc, //retreive document inside of our fire store database
  //doc is only get document instanse
  getDoc, // access data
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA18LKry-JL3v4kFfFKXznDJajsRy6GuPA",
  authDomain: "crwn-clothing-db-72dc9.firebaseapp.com",
  projectId: "crwn-clothing-db-72dc9",
  storageBucket: "crwn-clothing-db-72dc9.appspot.com",
  messagingSenderId: "1074014790168",
  appId: "1:1074014790168:web:c61dffb8bf616a1ecb996d",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
// have different provider

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot);
  console.log(userSnapShot.exists());

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (err) {
      console.log("error creating the user", err.message);
    }
  }
  //if user data exists

  return userDocRef;
  //if user data does not exist
};
