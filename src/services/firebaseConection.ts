import { initializeApp } from 'firebase/app';

const firebaseConfig = {

    apiKey: "AIzaSyAsT1Zld25PX8NTha63duu-2aeVmPhlmz4",
    authDomain: "board-hd.firebaseapp.com",
    projectId: "board-hd",
    storageBucket: "board-hd.appspot.com",
    messagingSenderId: "40644274181",
    appId: "1:40644274181:web:3245c58e7d7b3e16a7946c",
    measurementId: "G-22H1THGEP6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;


