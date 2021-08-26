const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');


// 🌀
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

// 📰 Obtiene todos los proyectos del usuario actual - obtenerProyectos
exports.obtenerProyecto = async (req, res) => {
	try {
		console.log(req.usuarios);
		const proyectos = await Proyecto.find({creador: req.usuario.id}).sort({creado: -1});
		res.json({proyectos});

	} catch (error) {
		console.log(error);
		res.status(500).send('Hubo un error');
	}
}

// ✍ Actualizar un proyecto  
exports.actualizarProyecto = async (req, res) =>{

	//revisar si existen errores
	const errores = validationResult(req);
	if(!errores.isEmpty()){
		return res.status(400).json({errores: errores.array()});
	}

	try {
		const { nombre } = req.body;
		const nuevoProyecto = {};

		if(nombre){
			nuevoProyecto.nombre = nombre;
		}

		// Revisar el ID
		let proyecto = await Proyecto.findById(req.params.id);

		// si el proyecto existe o no
		if(!proyecto){
			return res.status(404).json({msg:'Proyecto no encontrado!'});
		}

		//verificar el creador del proyecto
		if(proyecto.creador.toString() !== req.usuario.id){
			return res.status(401).json({msg: 'Proyecto No autorizado'});
		}

		//actualizar
		proyecto = await Proyecto.findByIdAndUpdate({ _id: req.params.id},
			{$set: nuevoProyecto} , {new: true}
		);

		return res.json({proyecto});

	} catch (error) {
		console.log(error);
		res.status(500).send('Hubo un error');
	}
}


// ⛔  Eliminar Proyecto
exports.eliminarProyecto = async (req, res) => {
	try {
		// Revisar el ID
		let proyecto = await Proyecto.findById(req.params.id);

		// si el proyecto existe o no
		if(!proyecto){
			 return res.status(404).json({msg:'Proyecto no encontrado!'});
		}

		//verificar el creador del proyecto, typeof
		if(proyecto.creador.toString() !== req.usuario.id){
			return res.status(401).json({msg: 'Proyecto No autorizado'});
		}
		//Eliminar el Proyecto
		await Proyecto.findByIdAndDelete({ _id: req.params.id});

		res.json({msg: 'Proyecto Eliminado ✔️'});

	} catch (error) {
		
		res.status(500).send('Hubo un error');
	}
}