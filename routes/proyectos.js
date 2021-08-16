const express = require('express');
const router = express.Router();
const ProyectoController = require('../controllers/ProyectoController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

// crea Proyectos
// api/proyectos
router.post('/',
	auth,
	[
        check('nombre', 'El Nombre es obligatorio').not().isEmpty()
    ],
	ProyectoController.crearProyecto
);

router.get('/',
	auth,
	ProyectoController.crearProyecto
);

module.exports = router;