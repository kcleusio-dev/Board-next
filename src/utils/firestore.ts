import { getFirestore } from "firebase/firestore";
import app from '../services/firebaseConection';

const db = getFirestore(app);

export default db;