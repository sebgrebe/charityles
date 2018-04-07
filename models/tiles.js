const mongoose = require('mongoose')

var tileSchema = mongoose.Schema({
  img: {
    url: String,
    title: String
  },
  owner_id: String,
  caption: String,
  donate_link: String
})

module.exports = mongoose.model('Tile',tileSchema)
