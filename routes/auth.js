//Ruta para Autenticar usuarios
const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const autController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Iniciar Sesion
// api/auth
router.post('/',
	[
		check('email', 'Agrega un email valido').isEmail(),
		check('password', 'El password debe ser minimo de 6 caracteres').isLength({min: 6})
	],
	autController.autenticarAusuario
);


router.get('/',
	auth,
	autController.usuarioAutenticado
);

module.exports = router;
