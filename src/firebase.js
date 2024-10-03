import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCEOrYbSy0F1famvATYR0QItGVuglJ78bQ",
  authDomain: "disney-clone-v1-3c4a2.firebaseapp.com",
  projectId: "disney-clone-v1-3c4a2",
  storageBucket: "disney-clone-v1-3c4a2.appspot.com",
  messagingSenderId: "899948232251",
  appId: "1:899948232251:web:a3e69beb96d4731bfe661e",
  measurementId: "G-4YSQGEKS4K"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error(error);
  }
};