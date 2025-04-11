const loginRouter = require("express").Router();
const User = require("../models/user");
const bbcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Lógica cuando el usuario se logea
loginRouter.post("/", async (request, response) => {
  const { email, password } = request.body;
  const userExist = await User.findOne({ email });

  if (!userExist) {
    return response.status(400).json({ error: "email o contraseña invalido" });
  }

  // Se valida la propiedad verified del usuario en MongoDB
  if (!userExist.verified) {
    return response.status(400).json({ error: "Tu email no esta verificado" });
  }

  const isCorrect = await bbcrypt.compare(password, userExist.passwordHash);
  if (!isCorrect) {
    return response.status(400).json({ error: "email o contraseña invalido" });
  }

  const userForToken = {
    id: userExist._id.toString(),
  };

  const accesToken = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  response.cookie("accesToken", accesToken, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 1),
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });

  // Console log para mostrar el userID en la consola
  console.log("User logged in, userID:", userExist._id.toString());
  
  // Nota: localStorage no está disponible en Node.js, así que esa línea se elimina.
  
  // Se retorna el userId en la respuesta
  return response.status(200).json({ userId: userExist._id.toString() });
});

module.exports = loginRouter;