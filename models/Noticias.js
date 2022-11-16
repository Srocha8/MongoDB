const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var myDate = new Date("2016-05-18T16:00:00Z");


const NoticiaSchema = new Schema({

    edicion: Number,
    seccion: String,
    titulo: String,
    texto: String,
    imagen: String,
    fecha: Date
})

//crear modelo
const Noticias = mongoose.model('Noticias', NoticiaSchema);
module.exports = Noticias;

