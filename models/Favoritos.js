var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  id: String,  
  title: String,
  description: String,
  image: String, 
  name: String, 
  species: String,
  type:String,
  status:String,
  user_id:String
});

var Favoritos = mongoose.model("Favoritos", PostSchema);
module.exports = Favoritos;