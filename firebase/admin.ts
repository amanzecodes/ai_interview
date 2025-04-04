import { cert, getApps } from "firebase-admin/app"
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "@firebase/auth"
import { getFirestore } from "firebase-admin/firestore";

const initFirebaseAdmin = () => {
    const apps = getApps();

    if(!apps.length) {
        initializeApp({
            credential: cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            })
        })
    }
    return {
        auth: getAuth(),
        db: getFirestore()
    }
}

const { auth, db } = initFirebaseAdmin();
export { auth, db };