import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyA3yYhjLDHxNnkcFUiSzFZJbxM6-jrt3YE",
    authDomain: "assignment4-1-d1bf3.firebaseapp.com",
    projectId: "assignment4-1-d1bf3",
    storageBucket: "assignment4-1-d1bf3.appspot.com",
    messagingSenderId: "1098007639841",
    appId: "1:1098007639841:web:67c0381a77bc87a64df060",
    measurementId: "G-82FB1MWLDW"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
// export const storage = firebase.storage();



const provider = new firebase.auth.GoogleAuthProvider();

export const SignInWithGoogle = () => {
    auth.signInWithPopup(provider);
}

export const generateUserDocument = async (user, additionalData) => {
    if(!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
        const { photoURL, email, displayName} = user;
        try {
            await userRef.set({
                displayName,
                email,
                photoURL,
                ...additionalData
            });
        } catch (error) {
            console.error("Error creating user document", error);
        }
    }
    return getUserDocument(user.uid);
};


const getUserDocument = async uid => {
    if (!uid) return null;
    try {
        const userDocument = await firestore.doc(`users/${uid}`).get();
        return {
            uid,
            ...userDocument.data()
        };
    } catch (error) {
        console.error("Error fetching user", error);
    }
};
