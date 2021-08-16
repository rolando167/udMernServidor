//Ruta para crear Usuarios y Listar
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');


//Crear usuario y el Endpoint es:
// api/usuarios
router.post('/', 
    [
        check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email valido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({min: 6})
    ],
    usuarioController.crearUsuario
);

module.exports = router;
