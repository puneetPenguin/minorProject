
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_4I-iT09nfHy70S7Bg5zPP66OSyH53os",
    authDomain: "minor-project-f9807.firebaseapp.com",
    projectId: "minor-project-f9807",
    storageBucket: "minor-project-f9807.appspot.com",
    messagingSenderId: "872671720134",
    appId: "1:872671720134:web:b9fc650f1b88a22e305dc7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const provider = new GoogleAuthProvider();
// const appCheck = initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider(process.env.RECAPTCHA),
//   isTokenAutoRefreshEnabled: true,
// });

export { auth, db, provider };
