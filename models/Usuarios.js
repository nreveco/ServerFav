var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  nombre: String,  
  email: String,
  pass: String
});

var Usuarios = mongoose.model("Usuarios", PostSchema);
module.exports = Usuarios;