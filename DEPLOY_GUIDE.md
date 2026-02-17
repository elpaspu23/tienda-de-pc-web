# 🚀 Cómo subir tu tienda a internet (Sacar del Localhost)

Como ya tienes tu código en GitHub, el proceso para publicar la tienda es muy sencillo. Tienes dos partes: el **Frontend** (la página que ven los clientes) y el **Backend** (donde se guardan los pedidos y se envían los correos).

## 1️⃣ Publicar el Frontend (La Página Web)

La forma más fácil y gratuita es usar **Vercel** o **Netlify**.

### Pasos en Vercel (Recomendado):
1.  Ve a [vercel.com](https://vercel.com) y regístrate con tu cuenta de **GitHub**.
2.  Haz clic en **"Add New..."** -> **"Project"**.
3.  Verás tu repositorio `tienda-de-pc-web`. Haz clic en **"Import"**.
4.  En "Framework Preset", debería detectar **Vite** automáticamente.
5.  Haz clic en **"Deploy"**.
6.  ¡Listo! En unos segundos tendrás un link tipo `https://tienda-de-pc-web.vercel.app` que puedes compartir con cualquiera.

---

## 2️⃣ El Backend (Datos y Correos)

Aquí hay un detalle importante: Tu "servidor" actual (`json-server` y el envío de correos) está diseñado para correr en tu computadora.

### Opciones:
*   **Opción A (Solo Frontend):** Si subes solo el frontend a Vercel, la página funcionará visualmente, pero **no guardará pedidos ni enviará correos reales** porque no tiene acceso a tu computadora (localhost).
*   **Opción B (Servidor en la Nube - Avanzado):** Necesitas subir tu `server.js` a un servicio como **Render** o **Railway**. Esto requiere configuración adicional.
*   **Opción C (Firebase - Recomendado a futuro):** Vi que tienes instalado `firebase`. Lo ideal sería usar Firebase para la base de datos y Cloud Functions para los correos. Así no necesitas mantener un servidor encendido y funciona perfecto con Vercel.

**Por ahora:** Te recomiendo subir el **Frontend a Vercel** para que veas tu tienda online y la puedas mostrar. Para funcionalidades completas (pagos reales, correos), necesitarás configurar el Backend en la nube.
