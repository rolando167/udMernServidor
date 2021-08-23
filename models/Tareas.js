const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var tareaSchema = new mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    estado:{
        type:Boolean,
        default:false,
    },
    creado:{
        type:Date,
        default: Date.now(),
        unique:true,
    },
    proyecto:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto'
        
    },
});

//Export the model
module.exports = mongoose.model('Tarea', tareaSchema);