// Firebase Seed Script - Run this in the browser console or as a one-time page
// to upload all products to Firestore.
//
// Usage: Import this component temporarily in your App.jsx and click the button,
// or run `seedProducts()` from the browser console while on the site.

import { db } from '../firebase/config';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { products } from '../data/products';

const COLLECTION_NAME = 'products';

// Clear existing products and add new ones
export const seedProducts = async () => {
    console.log('🚀 Starting Firebase seed...');

    try {
        // 1. Delete existing products
        console.log('🗑️ Deleting existing products...');
        const existing = await getDocs(collection(db, COLLECTION_NAME));
        const deletePromises = existing.docs.map(d => deleteDoc(doc(db, COLLECTION_NAME, d.id)));
        await Promise.all(deletePromises);
        console.log(`   Deleted ${existing.docs.length} existing products`);

        // 2. Add all new products
        console.log('📦 Adding new products...');
        let count = 0;
        for (const product of products) {
            // Remove the local 'id' field — Firestore generates its own
            const { id, ...productData } = product;
            await addDoc(collection(db, COLLECTION_NAME), productData);
            count++;
            console.log(`   [${count}/${products.length}] Added: ${product.name}`);
        }

        console.log(`\n✅ Seed complete! Added ${count} products to Firebase.`);
        return { success: true, count };
    } catch (error) {
        console.error('❌ Seed failed:', error);
        return { success: false, error: error.message };
    }
};

// React component for one-click seeding
export default function SeedButton() {
    const handleSeed = async () => {
        if (!window.confirm('⚠️ Esto borrará TODOS los productos actuales de Firebase y los reemplazará con los 45 nuevos. ¿Continuar?')) {
            return;
        }
        const result = await seedProducts();
        if (result.success) {
            alert(`✅ ¡Listo! Se agregaron ${result.count} productos a Firebase.`);
            window.location.reload();
        } else {
            alert(`❌ Error: ${result.error}`);
        }
    };

    return (
        <button
            onClick={handleSeed}
            style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: 9999,
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #00ff88, #00ccff)',
                color: '#000',
                border: 'none',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '14px',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(0,255,136,0.3)'
            }}
        >
            🌱 Seed Firebase ({products.length} productos)
        </button>
    );
}
