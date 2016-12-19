var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var GameSchema = new Schema ({
  title: String,
  genre: String,
  publisher: String,
  console: String,
  releaseDate: Date,
  img: String
});

var Game = mongoose.model('Game', GameSchema);
module.exports = Game;
