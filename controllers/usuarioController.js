const Usuario = require('../models/Usuario'); // se importa el modelo Usuarios
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


exports.crearUsuario = async (req, res) =>{

	// Revisar si hay errores
	const errores = validationResult(req);
	if(!errores.isEmpty()){
		return res.status(400).json({errores: errores.array()});
	}

	const { email, password} = req.body;

	try {
		//revisar que el usaurio registrado sea único
		let usuario = await Usuario.findOne({email});

		if(usuario) { // Validar
			return res.status(400).json({ msg: 'El usuario ya existe !!' });
		}

		//Crea el nuevo usuario
		usuario = new Usuario(req.body);

		//Hashear el Password
		const salt = await bcryptjs.genSalt(10);
		usuario.password = await bcryptjs.hash(password, salt);

		//Guarda usaurio
		await usuario.save();

		//Crear y firmar el JWT
		const payload = {
			usuario: {
				id: usuario.id
			}
		};

		//firmar el JWT
		jwt.sign(payload, process.env.SECRETA, {
			expiresIn: 3600 // 1 hora
		},(error, token) => {
			if(error) throw error;
			res.json({token});
		});

		//Mensaje de confirmación
		// res.json({msg: 'Usuario Creado Correctamente'});

	} catch (error) {
		console.log(error);
		res.status(400).send('Hubo un error ⛔');
	}
}