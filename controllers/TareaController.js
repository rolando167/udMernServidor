const Tareas = require('../models/Tareas');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

exports.obtenerTarea = async (req, res) => {
	try {

		const {proyecto} = req.body;
        
		const existProyecto = await Proyecto.find(proyecto);

		if(!existProyecto){
			return res.status(404).json({msg: 'Proyecto no encontrado'});
		}

		// revisar si el proyecto actual pertenence al usuario autenticado
		if(existProyecto.creador.String() !== req.usuario.id){
			return res.status(401).json({msg: 'Proyecto No autorizado'});
		}

		//Obtener las tareas
		const tareas = await Tareas.find({proyecto});
		res.json({tareas});

	} catch (error) {
		console.log(error);
		res.status(500).send('Hubo un error');
	}
}

// 🌀
exports.crearTarea = async (req, res) => {
	//revisar si existen errores
	const errores = validationResult(req);
	if(!errores.isEmpty()){
		return res.status(400).json({errores: errores.array()});
	}

	try {
		//extraer el proyecto y comprobar si existe
		const {proyecto} = req.body;
		
		const existProyecto = await Proyecto.find(proyecto);

		if(!existProyecto){
			return res.status(404).json({msg: 'Proyecto no encontrado'});
		}

		// revisar si el proyecto actual pertenence al usuario autenticado
		if(existProyecto.creador.String() !== req.usuario.id){
			return res.status(401).json({msg: 'Proyecto No autorizado'});
		}

		//Crear tarea
		const tarea = new Tareas(req.body);
		await tarea.save();
		res.json({tarea});

	} catch (error) {
		console.error(error);
		res.status(500).send('Hubo un error');
	}
}

exports.actualizarTarea = async(req, res) => {
	try {
		//extraer el proyecto y comprobar si existe
		const {proyecto, nombre, estado} = req.body;


		// si la tarea existe o no
		let existTarea = await Tarea.find(req.params.id);

		if(!existTarea){
			return res.status(401).json({msg: 'No existe tarea'});
		}

		const existProyecto = await Proyecto.find(proyecto);


		// revisar si el proyecto actual pertenence al usuario autenticado
		if(existProyecto.creador.String() !== req.usuario.id){
			return res.status(401).json({msg: 'Proyecto No autorizado'});
		}

		if(!existProyecto){
			return res.status(404).json({msg: 'Proyecto no encontrado'});
		}

		// crear un objteto con la nueva informacion
		const nuevaTarea = {};

		if(nombre){
			nuevaTarea.nombre = nombre;
		}

		if(estado){
			nuevaTarea.estado = estado;
		}

		// Guardar la tarea
		existTarea = await Tareas.findOneAndUpdate({_id: req.params.id}, nuevaTarea, {new:true});
		res.json({tarea});

	} catch (error) {
		console.error(error);
		res.status(500).send('Hubo un error');
	}
}

exports.eliminarTarea = async(req, res) => {
	try {
		//extraer el proyecto y comprobar si existe
		const {proyecto } = req.body;


		// si la tarea existe o no
		let existTarea = await Tarea.find(req.params.id);

		if(!existTarea){
			return res.status(401).json({msg: 'No existe tarea'});
		}

		const existProyecto = await Proyecto.find(proyecto);

		// revisar si el proyecto actual pertenence al usuario autenticado
		if(existProyecto.creador.String() !== req.usuario.id){
			return res.status(401).json({msg: 'Proyecto No autorizado'});
		}

		if(!existProyecto){
			return res.status(404).json({msg: 'Proyecto no encontrado'});
		}

		// eliminar tarea
		await Tareas.findOneAndRemove({_id: req.params.id});
		res.json({msg: 'Tarea eliminada!'});
	} catch (error) {
		console.error(error);
		res.status(500).send('Hubo un error');
	}
}