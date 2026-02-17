# 🔥 Guía de Configuración Firebase (Base de Datos Gratis)

Para que tu tienda funcione gratis en internet (sin tener la PC encendida), usaremos **Firebase Firestore**.

## Pasos:

1.  Ve a [console.firebase.google.com](https://console.firebase.google.com) e inicia sesión con Google.
2.  Haz clic en **"Crear un proyecto"**. Ponle nombre (ej: `techstore-db`) y dale a Continuar > Continuar > Crear proyecto.
3.  Una vez creado, haz clic en el icono de **Web (`</>`)** para agregar una app.
    -   Nombre: `TechStore Web`.
    -   Registrar app.
4.  Te mostrará un código con `firebaseConfig`. **COPIA** esos valores (apiKey, authDomain, etc.).
5.  Abre el archivo `src/firebase/config.js` en tu proyecto y pega los valores donde corresponde.

## Activar Base de Datos (Firestore)

1.  En el menú de la izquierda de Firebase, ve a **Compilación** -> **Firestore Database**.
2.  Haz clic en **Crear base de datos**.
3.  Elige una ubicación (ej: `us-central` o la que prefieras).
4.  **IMPORTANTE:** En Reglas de seguridad, elige **"Comenzar en modo de prueba"** (para que funcione fácil al principio).
5.  Dale a **Habilitar**.

¡Listo! Ahora tu tienda podrá leer y guardar datos en la nube.
