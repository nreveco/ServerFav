const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
var Favoritos = require("../models/Favoritos.js");
var Usuarios = require("../models/Usuarios.js");
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/favoritos');
var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
  console.log("Connection Succeeded");
});

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

app.get('/Favoritos', (req, res) => {
    Favoritos.find({}, 'id title description name image species type status user_id', function (error, Favoritos) {
      if (error) { console.error(error); }
      res.send({
        Favoritos: Favoritos
      })
    }).sort({_id:-1})
  })

// Add new Favorito
app.post('/postFavorito', (req, res) => {
    var db = req.db;
    var title = req.body.title;
    var description = req.body.description;
    var image = req.body.image;
    var name = req.body.name;
    var species = req.body.species;
    var type = req.body.type;
    var status = req.body.status;
    var user_id = req.body.user_id;
    var new_favoritos = new Favoritos({
        title: title,
        description: description,
        image: image, 
        name: name, 
        species: species,
        type:type,
        status:status,
        user_id:user_id
    })
  
    new_favoritos.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true,
        message: 'Favoritos saved successfully!'
      })
    })
  })
  
// Add new Usuario
app.post('/postUsuario', (req, res) => {
    var db = req.db;
    var nombre = req.body.nombre;
    var email = req.body.email;
    var pass = req.body.pass;
   
    var new_user = new Usuarios({
        nombre: nombre,
        email: email,
        pass: pass
    })
  
    new_user.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true,
        message: 'Usuarios saved successfully!'
      })
    })
  })

app.listen(process.env.PORT || 8081)