 
const path = require('path');
const express = require('express');

const { config, engine } = require('express-edge')

const app = new express()

const user ='app_bases'
const password = 'sBbScY5h1AjsoNog'
const dbname = 'revista'
const uri = `mongodb+srv://${user}:${password}@cluster0.uuhtafr.mongodb.net/${dbname}?retryWrites=true&w=majority`

//Modelo
const revista = require ('./models/Noticias')

//conexion a base de datos
const mongoose = require('mongoose');
const Noticias = require('./models/Noticias');
mongoose.connect(uri)

.then(()=> console.log('Base de datos conectada'))
.catch(e => console.log(e))

//parser
const bodyParser = require('body-parser')

//body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// Automatically sets view engine and adds dot notation to app.render
app.use(engine);
app.set('views', `${__dirname}/views`);

app.get('/', (req, res) => {

    res.render('index')

});

app.get('/actualizar', (req, res) => {

    //res.sendFile(path.resolve(__dirname, 'paginas/actualizar.html'))
    res.render('actualizar')

});

app.post('/actualizar/guardar', (req, res) => {
    Noticias.create(req.body, (error,Noticias) => {
        res.redirect('/')
    })
})

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