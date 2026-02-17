import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    // CORS headers just in case (though usually same-origin)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const orderData = req.body;

        // Validar datos mínimos
        if (!orderData || !orderData.customer || !orderData.customer.email) {
            return res.status(400).json({ error: 'Missing order data or email' });
        }

        // Configurar Transporter (Usando variables de entorno de Vercel)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER, // DEBE configurarse en Vercel
                pass: process.env.EMAIL_PASS  // DEBE configurarse en Vercel
            }
        });

        // HTML del correo
        const total = orderData.total || 0;
        const itemsList = (orderData.items || []).map(item =>
            `<li>${item.name} x ${item.quantity} - $${item.price.toLocaleString('es-CO')}</li>`
        ).join('');

        const mailOptions = {
            from: `"TechStore" <${process.env.EMAIL_USER}>`,
            to: orderData.customer.email,
            subject: `Confirmación de Compra - Orden #${orderData.id || Date.now()}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
                    <h2 style="color: #10b981;">¡Gracias por tu compra, ${orderData.customer.name}!</h2>
                    <p>Hemos recibido tu pedido correctamente.</p>
                    
                    <div style="background: #f9fafb; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">Resumen del Pedido</h3>
                        <p><strong>ID de Orden:</strong> ${orderData.id || 'Pendiente'}</p>
                        <ul>
                            ${itemsList}
                        </ul>
                        <p style="font-size: 1.2em; font-weight: bold;">Total: $${total.toLocaleString('es-CO')}</p>
                    </div>

                    <p>Método de Pago: ${orderData.paymentMethod}</p>
                    
                    <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                    
                    <p style="font-size: 0.9em; color: #666;">
                        Si tienes alguna pregunta, responde a este correo.<br>
                        Atentamente,<br>
                        <strong>Equipo TechStore</strong>
                    </p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: %s', info.messageId);

        res.status(200).json({ success: true, messageId: info.messageId });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
}
