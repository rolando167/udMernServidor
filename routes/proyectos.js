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

//Obtener todos los proyectos
router.get('/',
	auth,
	ProyectoController.obtenerProyecto
);

// Actualizar proyecto via ID
// api/proyectos/:id
router.put('/:id',
	auth,
	[
		check('nombre', 'El Nombre es obligatorio').not().isEmpty()
	],
	ProyectoController.actualizarProyecto
);

//Eliminar un proyecto
router.delete('/delete/:id',
	auth,
	ProyectoController.eliminarProyecto
);

module.exports = router;