const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');


exports.crearProyecto = async (req, res) => {

    //revisar si existen errores
    const errores = validationResult(req);
	if(!errores.isEmpty()){
		return res.status(400).json({errores: errores.array()});
	}

    try {
        const proyecto = new Proyecto(
            req.body
        );
        // Guardar el creador via JWT
        proyecto.creador = req.usuario.id;

        //Guardar el proyecto
        proyecto.save();
        res.json(proyecto);

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}