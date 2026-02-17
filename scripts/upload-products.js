import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc, setDoc } from "firebase/firestore";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Lee la configuración
// NOTA: Como config.js usaba variables de entorno o placeholders, mejor definimos aquí o leemos config
// Para este script, le pedimos al usuario que ponga sus credenciales AQUI O que config.js ya las tenga.
// Importamos config de ../src/firebase/config.js
// Pero cuidado si config.js tiene "TU_API_KEY", fallará.

// Mejor enfoque: Leer db.json y usar config.js asumiento que el usuario ya lo llenó.
import { db } from '../src/firebase/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, '../db.json');

const uploadData = async () => {
    try {
        console.log("Leyendo db.json...");
        const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        const products = data.products;

        if (!products || products.length === 0) {
            console.log("No hay productos en db.json");
            return;
        }

        console.log(`Encontrados ${products.length} productos. Subiendo a Firestore...`);

        const productsRef = collection(db, 'products');

        for (const product of products) {
            // Usamos el ID del producto como ID del documento para mantener consistencia?
            // O dejamos que Firestore genere ID?
            // db.json tiene ids numéricos o string. Si son "1", "2"... mejor usar setDoc con ese ID
            // para que las URLs existentes (/products/1) sigan funcionando.

            const docId = String(product.id);
            // Eliminamos ID del objeto data para no duplicarlo, o lo dejamos? Dejémoslo.

            await setDoc(doc(db, 'products', docId), product);
            console.log(`Producto subido: ${product.name} (ID: ${docId})`);
        }

        console.log("✅ ¡Carga completa!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error subiendo datos:", error);
        process.exit(1);
    }
};

uploadData();
