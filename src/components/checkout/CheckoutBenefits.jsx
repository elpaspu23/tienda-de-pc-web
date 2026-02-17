import React from 'react';
import { ShieldCheck, Truck, Headphones, RefreshCw } from 'lucide-react';

export default function CheckoutBenefits() {
    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '20px',
            padding: '24px',
            marginTop: '20px',
            fontFamily: "'DM Sans', sans-serif"
        }}>
            <h3 style={{
                color: '#fff',
                fontSize: '16px',
                fontWeight: 700,
                marginBottom: '20px',
                fontFamily: "'Space Grotesk', sans-serif"
            }}>
                ¿Por qué elegirnos?
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ color: '#00ff88', marginTop: '2px' }}>
                        <ShieldCheck size={20} />
                    </div>
                    <div>
                        <h4 style={{ color: 'white', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>
                            Garantía Oficial
                        </h4>
                        <p style={{ color: '#888', fontSize: '12px', lineHeight: '1.4' }}>
                            Todos nuestros productos cuentan con garantía directa de fábrica por 12 meses.
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ color: '#00ccff', marginTop: '2px' }}>
                        <Truck size={20} />
                    </div>
                    <div>
                        <h4 style={{ color: 'white', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>
                            Envío Asegurado
                        </h4>
                        <p style={{ color: '#888', fontSize: '12px', lineHeight: '1.4' }}>
                            Tu compra viaja protegida hasta que la recibes en tus manos.
                        </p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ color: '#a855f7', marginTop: '2px' }}>
                        <Headphones size={20} />
                    </div>
                    <div>
                        <h4 style={{ color: 'white', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>
                            Soporte Experto
                        </h4>
                        <p style={{ color: '#888', fontSize: '12px', lineHeight: '1.4' }}>
                            ¿Dudas? Nuestro equipo de expertos está disponible 24/7 para ayudarte.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
