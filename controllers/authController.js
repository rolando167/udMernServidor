const Usuario = require('../models/Usuario'); // se importa el modelo Usuarios
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


exports.autenticarAusuario = async (req, res) => {
    // Revisar si hay errores
	const errores = validationResult(req);
	if(!errores.isEmpty()){
		return res.status(400).json({errores: errores.array()});
	}

    //extraer el email y password
    const { email, password } = req.body;

    try {
        // revisar que sea usuario registrado
        let usuario = await Usuario.findOne({email});
        if(!usuario){
		    return res.status(400).json({msg: 'Usuario no existe'});
        }

        //Revisar password
        const passCorrecto = await bcryptjs.compare(password, usuario.password);

        if(!passCorrecto){
		    return res.status(400).json({msg: 'Password Incorrecto'});
        }

        //si todo es correcto, Crear y firmar el JWT
        const payload = {
			usuario: {
				id: usuario.id
			}
		};

		jwt.sign(payload, process.env.SECRETA, {
			expiresIn: 3600 // 1 hora
		},(error, token) => {
			if(error) throw error;
			res.json({token});
		});

    } catch (error) {
        console.log(error);
    }

}

exports.usuarioAutenticado  = async (req, res) => {

    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password');
        res.json({usuario});
    } catch (error) {
        console.log(error);
    }
}