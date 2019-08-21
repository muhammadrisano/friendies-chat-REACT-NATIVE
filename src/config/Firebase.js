import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/firestore';
var firebaseConfig = {
    apiKey: "AIzaSyANxX62MAEwHoAQeGopWuBoOFdTz-mfWfk",
    authDomain: "friendies-e4fcb.firebaseapp.com",
    databaseURL: "https://friendies-e4fcb.firebaseio.com",
    projectId: "friendies-e4fcb",
    storageBucket: "friendies-e4fcb.firebaseio.com",
    messagingSenderId: "63683820532",
    appId: "1:63683820532:web:339ae0dd59a07840"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;