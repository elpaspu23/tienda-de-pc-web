import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================
// CONFIGURACIÓN DEL TRANSPORTER DE EMAIL
// ============================================

const createTransporter = () => {
    // Usar variables de entorno preferiblemente
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Opción Ethereal para pruebas (si no hay credentials)
    // const testAccount = await nodemailer.createTestAccount();
    // return nodemailer.createTransport({
    //     host: "smtp.ethereal.email",
    //     port: 587,
    //     secure: false, 
    //     auth: { user: testAccount.user, pass: testAccount.pass },
    // });
};


// ============================================
// GENERACIÓN DE PDF DE LA FACTURA
// ============================================

export const generateInvoicePDF = async (orderData) => {
    try {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();

        // Leer template HTML
        const templatePath = path.join(__dirname, 'templates', 'invoice-template.html');
        let htmlContent = await fs.readFile(templatePath, 'utf8');

        // Reemplazar variables en el HTML
        if (!orderData.invoiceNumber) {
             orderData.invoiceNumber = `INV-${Date.now()}`;
        }
        
        // Calcular total si no viene
        const total = orderData.total || (orderData.items ? orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) : 0);
        
        // Formatear fecha
        const date = new Date().toLocaleDateString('es-CO');

        // Reemplazos básicos
        htmlContent = htmlContent
            .replace('{{INVOICE_NUMBER}}', orderData.invoiceNumber)
            .replace('{{DATE}}', date)
            .replace('{{CUSTOMER_NAME}}', orderData.customer?.name || 'Cliente')
            .replace('{{CUSTOMER_ID}}', orderData.customer?.idNumber || '')
            .replace('{{CUSTOMER_EMAIL}}', orderData.customer?.email || '')
            .replace('{{CUSTOMER_PHONE}}', orderData.customer?.phone || '')
            .replace('{{CUSTOMER_ADDRESS}}', orderData.customer?.address || '')
            .replace('{{PAYMENT_METHOD}}', orderData.paymentMethod || 'N/A')
            .replace('{{TOTAL}}', `$${total.toLocaleString('es-CO')}`);

        // Generar filas de productos
        let itemsHtml = '';
        if (orderData.items && Array.isArray(orderData.items)) {
            itemsHtml = orderData.items.map(item => `
                <tr>
                    <td>${item.name}</td>
                    <td class="text-right">${item.quantity}</td>
                    <td class="text-right">$${item.price.toLocaleString('es-CO')}</td>
                    <td class="text-right">$${(item.price * item.quantity).toLocaleString('es-CO')}</td>
                </tr>
            `).join('');
        }
        htmlContent = htmlContent.replace('{{ITEMS_ROWS}}', itemsHtml);

        // Set content and generate PDF
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });

        await browser.close();
        return pdfBuffer;

    } catch (error) {
        console.error('Error generando PDF:', error);
        throw error;
    }
};

// ============================================
// ENVÍO DEL EMAIL
// ============================================

export const sendInvoiceEmail = async (orderData) => {
    try {
        const transporter = createTransporter();
        const pdfBuffer = await generateInvoicePDF(orderData);

        const mailOptions = {
            from: `"TechStore Facturación" <${process.env.EMAIL_USER}>`,
            to: orderData.customer.email,
            subject: `Factura de Compra #${orderData.invoiceNumber} - TechStore`,
            html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2>¡Gracias por tu compra, ${orderData.customer.name}!</h2>
                    <p>Adjunto encontrarás la factura de tu pedido <strong>#${orderData.invoiceNumber}</strong>.</p>
                    <p>Resumen de pago:</p>
                    <ul>
                        <li>Total: <strong>$${orderData.total.toLocaleString('es-CO')}</strong></li>
                        <li>Método de pago: ${orderData.paymentMethod}</li>
                    </ul>
                    <p>Si tienes alguna duda, responde a este correo.</p>
                    <br>
                    <p>Atentamente,<br>El equipo de TechStore</p>
                </div>
            `,
            attachments: [
                {
                    filename: `Factura-${orderData.invoiceNumber}.pdf`,
                    content: pdfBuffer,
                    contentType: 'application/pdf'
                }
            ]
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('📧 Email enviado:', info.messageId);
        return info;

    } catch (error) {
        console.error('❌ Error enviando email:', error);
        throw error;
    }
};
