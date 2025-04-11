# 🎮 GameFinder

GameFinder es una aplicación web para descubrir, explorar y guardar tus videojuegos favoritos. Utiliza una API pública para mostrar juegos gratuitos y te permite gestionarlos desde tu cuenta de usuario.

## 🚀 Tecnologías utilizadas

- 🎨 Diseño: Figma  
- 💻 Frontend: HTML, CSS, JavaScript  
- 🎨 Estilos: TailwindCSS  
- 🔧 Backend: Node.js, Express  
- 🛢️ Base de datos: MongoDB  
- 🔐 Autenticación: JWT, bcrypt, cookie-parser  
- 📧 Correo electrónico: Nodemailer  
- 🌐 API externa: [FreeToGame](https://www.freetogame.com/api-doc)

---

## ✨ Funcionalidades principales

- Registro y login con validación vía email.
- Catálogo de juegos gratuitos en tiempo real.
- Filtro por género.
- Sistema de favoritos persistente por usuario.
- Protección de rutas mediante middleware JWT.
- Diseño responsive y atractivo.

---

## 🔐 Autenticación
- Los usuarios deben registrarse con correo electrónico válido.
- Se envía un enlace de verificación con Nodemailer.
- Las sesiones se mantienen usando JWT + Cookies.
- Middleware protege rutas sensibles como favoritos.
  
---
## Uso
- Registro de usuario.
- Inicio de sesión.
- Explorar juegos.
- Ver más detalles.
- Agregar a favoritos.
- Agregar a favoritos.
- Cerrar sesión.

  ---
## ⚙️Autor/a

- Adrianna Varela


