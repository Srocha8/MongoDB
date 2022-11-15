const mongoose = require('mongoose');
const Noticias = require('./models/Noticias');
const revista = require ('./models/Noticias')

const user ='app_bases'
const password = 'sBbScY5h1AjsoNog'
const dbname = 'revista'
const uri = `mongodb+srv://${user}:${password}@cluster0.uuhtafr.mongodb.net/${dbname}?retryWrites=true&w=majority`

mongoose.connect(uri)

.then(()=> console.log('Base de datos conectada22'))
.catch(e => console.log(e))

Noticias.find({}, (error, Noticias) =>{
     console. log(error, Noticias)
})



