import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyCgYNkNoh_4EEMNaL2NvS_sGqzOPAISk4I',
	authDomain: 'gkbs-website.firebaseapp.com',
	projectId: 'gkbs-website',
	storageBucket: 'gkbs-website.firebasestorage.app',
	messagingSenderId: '425299967954',
	appId: '1:425299967954:web:c2fa4ed49c0b8d8908d20b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
