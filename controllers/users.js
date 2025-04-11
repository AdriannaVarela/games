const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { PAGE_URL } = require("../config");

usersRouter.post("/", async (request, response) => {
  // Se extraen name, email, password y favoritos del request body
  const { name, email, password, favoritos } = request.body;
  console.log(name, email, password, favoritos);

  if (!name || !email || !password) {
    return response
      .status(400)
      .json({ error: "Todos los espacios son requeridos" });
  }

  const userExist = await User.findOne({ email });
  console.log(userExist);

  if (userExist) {
    return response
      .status(400)
      .json({ error: "El email ya se encuentra en uso." });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    name,
    email,
    passwordHash,
    favoritos: favoritos || [] // Se asigna favoritos o un array vacío en caso de que no se reciba
  });

  const savedUser = await newUser.save();
  const token = jwt.sign({ id: savedUser.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER, // sender address
    to: savedUser.email, // list of receivers
    subject: "Verificación de usuario", // Subject line
    html: `<a href="${PAGE_URL}/verify/${savedUser.id}/${token}">Verificar usuario</a>`, // html body
  });
  return response
    .status(201)
    .json("Usuario creado. Por favor verifica tu correo");
});

usersRouter.patch("/:id/:token", async (request, response) => {
  try {
    const token = request.params.token;
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const id = decodedToken.id;
    await User.findByIdAndUpdate(id, { verified: true });

    return response.sendStatus(200);
  } catch (error) {
    // Encontra el email del usuario
    const id = request.params.id;
    const { email } = await User.findById(id);
    // Firmar el nuevo token
    const token = jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    // Enviar el email
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER, // sender address
      to: email, // list of receivers
      subject: "Verificación de usuario", // Subject line
      html: `<a href="${PAGE_URL}/verify/${id}/${token}">Verificar usuario</a>`, // html body
    });

    return response
      .status(400)
      .json({
        error: "El link ya expiro. Se ha enviado un nuevo link de verificacion",
      });
  }
});


// Nueva función para actualizar los datos de un usuario, incluyendo el campo "favoritos"
// Nueva función para actualizar los datos de un usuario, haciendo append al campo "favoritos"
usersRouter.put("/:id", async (request, response) => {
	console.log("📥 Petición PUT recibida para ID:", request.params.id);
  
	// Se extraen los campos que se desean actualizar
	const { name, email, password, favoritos } = request.body;
	console.log("📦 Datos recibidos:", { name, email, password, favoritos });

	// Validamos que se envíe al menos un campo para actualizar
	if (!name && !email && !password && favoritos === undefined) {
		console.warn("⚠️ Ningún campo válido recibido para actualizar");
		return response.status(400).json({ error: "Al menos un campo debe ser proporcionado para actualizar" });
	}

	// Construir el objeto de actualización
	let updateData = {};
	if (name) {
		updateData.name = name;
		console.log("✅ Nombre a actualizar:", name);
	}
	if (email) {
		updateData.email = email;
		console.log("✅ Email a actualizar:", email);
	}
	if (password) {
		console.log("🔐 Encriptando nueva contraseña...");
		const saltRounds = 10;
		updateData.passwordHash = await bcrypt.hash(password, saltRounds);
		console.log("✅ Contraseña encriptada");
	}
	// Para el campo favoritos, agregamos los nuevos elementos sin sobrescribir los existentes
	if (favoritos !== undefined && Array.isArray(favoritos)) {
		updateData.$addToSet = { favoritos: { $each: favoritos } };
		console.log("✅ Favoritos a agregar:", favoritos);
	}

	try {
		console.log("🚀 Intentando actualizar usuario en la base de datos...");
		const updatedUser = await User.findByIdAndUpdate(request.params.id, updateData, { new: true });
		if (!updatedUser) {
			console.warn("❌ Usuario no encontrado con ese ID");
			return response.status(404).json({ error: "Usuario no encontrado" });
		}
		console.log("✅ Usuario actualizado correctamente:", updatedUser);
		return response.status(200).json(updatedUser);
	} catch (error) {
		console.error("🔥 Error al actualizar usuario:", error);
		return response.status(500).json({ error: "Error interno del servidor" });
	}
});

// En tu archivo de rutas (usersRouter), agrega:
usersRouter.get("/:id", async (req, res) => {
	try {
	  const userId = req.params.id;
	  // Buscamos el usuario por ID
	  const user = await User.findById(userId);
  
	  if (!user) {
		return res.status(404).json({ error: "Usuario no encontrado" });
	  }
  
	  // Devolvemos el usuario (o solo lo que quieras mostrar)
	  return res.status(200).json(user);
	} catch (error) {
	  console.error("Error al obtener usuario:", error);
	  return res.status(500).json({ error: "Error interno del servidor" });
	}
  });


  
module.exports = usersRouter;

