const path = require('path')
const express = require('express')
const { config, engine } = require('express-edge')
const multer = require('multer')


const app = new express()

//credenciales base de datos
const user ='app_bases'
const password = 'sBbScY5h1AjsoNog'
const dbname = 'revista'
const uri = `mongodb+srv://${user}:${password}@cluster0.uuhtafr.mongodb.net/${dbname}?retryWrites=true&w=majority`

//Modelo
const revista = require('./models/Noticias')

//conexion a base de datos
const mongoose = require('mongoose');
const Noticias = require('./models/Noticias');
mongoose.connect(uri)

.then(()=> console.log('Base de datos conectada'))
.catch(e => console.log(e))

//parser
const bodyParser = require('body-parser')
const { v4: uuidv4 } = require('uuid')


//body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//static files
app.use(express.static(('public')));


//Guardar y procesar imagen
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img'),
    filename: (req, file, cb, filename) => {
        cb(null, uuidv4() + path.extname(file.originalname))
    }
    
})
const subimg = (multer({

    storage: storage 

}).single('imagen'));

// Automatically sets view engine and adds dot notation to app.render
app.use(engine);
app.set('views', `${__dirname}/views`);




app.get('/', async(req, res) => {

    const notis = await Noticias.find({})
    console.log("Hola mundo")
     //console.log(req.file, 'Foto')

     res.render('index', {
         notis
     })

});


app.get('/revista', async(req, res) => {

    const notis = await Noticias.find({})

    res.render('revista', {
        notis,
    })

});



//actualizar base de datos
app.get('/actualizar', (req, res) => {

    res.render('actualizar')

});
app.post('/actualizar/guardar', subimg, (req, res) => {
  
    var obj = {
        edicion: req.body.edicion,
        seccion: req.body.seccion,
        titulo: req.body.titulo,
        texto: req.body.texto,
        imagen: 'img/' + req.file.filename,
        fecha: req.body.fecha
    }

    Noticias.create(obj, (err, item) => {
        if (err) {
            console.log(err);
        }
        else {
            // item.save();
            res.redirect('/');
        }
    });

})


//editar base
app.get('/agregar', (req, res) => {

    res.render('agregar')

});
app.get('/agregar/:id', async(req, res) => {

    //res.sendFile(path.resolve(__dirname, 'paginas/actualizar.html'))
    const idnoticia = await Noticias.findById(req.params.id)
    res.render('agregar', {
        idnoticia
    })

});

//ver datos base de datos
app.post('/agregar/guardar', subimg, (req, res) => {
    const idnoticias = req.body.id
    
    Noticias.findByIdAndUpdate(idnoticias,{

        edicion: req.body.edicion,
        seccion: req.body.seccion,
        titulo: req.body.titulo,
        texto: req.body.texto,
        imagen: 'img/' + req.file.filename,
        fecha: req.body.fecha

    }, (error, Noticias) => {

        res.redirect('/')

    })

})


app.get('/eliminar/:id', async(req, res) => {

    const idnoticia = await Noticias.findByIdAndRemove(req.params.id)

    console.log(idnoticia, '-----ELIMINADO PAAA----');

    res.render('eliminar', {
        idnoticia
    })

});

app.post('/eliminar/borrarfull', (req, res) => {
    
          res.redirect('/')


})

app.post('/revista/seccion', subimg, async(req, res) => {

    const notis = await Noticias.find({seccion : req.body.seccion, edicion: req.body.edicion})
    console.log(notis);
    res.render('revista', {
        notis,
    })

});

app.listen(process.env.PORT || 8080, () => {

    console.log("Aplicacion corriendo en el puerto 8080", 8080)
});

