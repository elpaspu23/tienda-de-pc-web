# ☁️ Guía: Variables de Entorno en Vercel (Para el Correo)

Para que el sistema de facturación envíe correos desde la nube (gratis), necesitas configurar tu cuenta de Gmail en Vercel.

## 1. Obtener Contraseña de Aplicación (Gmail)
Como usas Gmail, no puedes usar tu contraseña normal. Necesitas una "App Password".
1.  Ve a tu cuenta de Google -> Seguridad.
2.  Activa "Verificación en 2 pasos" si no la tienes.
3.  Busca "Contraseñas de aplicaciones" (App Passwords).
4.  Crea una nueva:
    -   App: "Correo" (o Otra: TechStore)
    -   Dispositivo: "Web"
5.  Copia la contraseña de 16 letras que te da (ej: `abcd efgh ijkl mnop`).

## 2. Configurar en Vercel
1.  Ve a tu proyecto en **Vercel**.
2.  Ve a **Settings** -> **Environment Variables**.
3.  Agrega las siguientes variables:

| Key (Nombre) | Value (Valor) |
| :--- | :--- |
| `EMAIL_USER` | Tu correo de Gmail completo (ej: `tucorreo@gmail.com`) |
| `EMAIL_PASS` | La contraseña de aplicación que copiaste (sin espacios) |

4.  Dale a **Save**.
5.  **IMPORTANTE:** Para que surta efecto, debes hacer un nuevo **Deploy** (o redeploy) en la pestaña "Deployments".

¡Listo! Ahora cuando alguien compre, el sistema usará estas credenciales para enviar el resumen del pedido.
