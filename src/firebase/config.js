import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCx4TK922KQ7HxJJP8jSjRP_p4uWKxKGpQ",
    authDomain: "techstore-f0d85.firebaseapp.com",
    projectId: "techstore-f0d85",
    storageBucket: "techstore-f0d85.firebasestorage.app",
    messagingSenderId: "327149764790",
    appId: "1:327149764790:web:e8f5697521bb5cff2fe617",
    measurementId: "G-V7WZF24L53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const db = getFirestore(app);
export const auth = getAuth(app);
// Analytics (optional, runs only in browser environment typically)
if (typeof window !== 'undefined') {
    getAnalytics(app);
}

export default app;
