const express = require('express');
const router = express.Router();
const TareaController = require('../controllers/TareaController');
const { check } = require('express-validator');
const auth = require('../middleware/auth');


//Obtener todas las tareas
router.get('/',
	auth,
	TareaController.obtenerTarea
);


// Crear
// api/tareas
router.post('/',
	auth,
    [
        check('nombre', 'El Nombre es obligatorio').not().isEmpty(),
        check('proyecto', 'El Proyecto es obligatorio').not().isEmpty(),
    ],
	TareaController.crearTarea
);

//actualizar una tarea
router.put('/:id',
    auth,
    TareaController.actualizarTarea
);

router.delete('/:id',
    auth,
    TareaController.eliminarTarea
);

module.exports = router;