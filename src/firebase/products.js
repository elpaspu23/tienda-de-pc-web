import { db } from './config';
import { collection, getDocs, getDoc, doc, query, where, addDoc } from 'firebase/firestore';

const COLLECTION_NAME = 'products';

// Obtener todos los productos
export const getProducts = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error getting products: ", error);
        // Fallback si falla (ej: config incorrecta)
        return [];
    }
};

// Obtener productos por categoría
export const getProductsByCategory = async (category) => {
    try {
        const q = query(collection(db, COLLECTION_NAME), where('category', '==', category));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error("Error getting products by category: ", error);
        return [];
    }
};

// Obtener un producto por ID
export const getProductById = async (id) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            console.log("No such product!");
            return null;
        }
    } catch (error) {
        console.error("Error getting product: ", error);
        return null;
    }
}
