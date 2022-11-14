 
const path = require('path');
const express = require('express');

const app = new express()

app.get('/', (req, res) => {

    res.sendFile(path.resolve(__dirname, 'paginas/index.html'))

});

app.get('/actualizar', (req, res) => {

    res.sendFile(path.resolve(__dirname, 'paginas/actualizar.html'))

});

app.get('/eliminar', (req, res) => {

    res.sendFile(path.resolve(__dirname, 'paginas/eliminar.html'))

});

app.listen(4001 , () => {

    console.log("Aplicacion corriendo en el puerto 4001", 4001)
});