import { db } from './config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const COLLECTION_NAME = 'orders';

// Crear una orden
export const createOrder = async (orderData) => {
    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...orderData,
            createdAt: serverTimestamp(),
            status: 'pending' // Estado inicial
        });
        console.log("Order written with ID: ", docRef.id);
        return { success: true, id: docRef.id };
    } catch (e) {
        console.error("Error adding document: ", e);
        return { success: false, error: e };
    }
};
