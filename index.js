 
const path = require('path');
const express = require('express');

const { config, engine } = require('express-edge')

const app = new express()

// Automatically sets view engine and adds dot notation to app.render
app.use(engine);
app.set('views', `${__dirname}/views`);

app.get('/', (req, res) => {

    //res.sendFile(path.resolve(__dirname, 'paginas/index.html'))
    res.render('index')

});

app.get('/actualizar', (req, res) => {

    //res.sendFile(path.resolve(__dirname, 'paginas/actualizar.html'))
    res.render('actualizar')

});

app.get('/agregar', (req, res) => {

    //res.sendFile(path.resolve(__dirname, 'paginas/actualizar.html'))
    res.render('agregar')

});

app.get('/eliminar', (req, res) => {

    //res.sendFile(path.resolve(__dirname, 'paginas/eliminar.html'))
    res.render('eliminar')

});



app.listen(4001 , () => {

    console.log("Aplicacion corriendo en el puerto 4001", 4001)
});