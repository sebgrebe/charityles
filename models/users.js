const mongoose = require('mongoose')

var userSchema = mongoose.Schema({
  twitter_user_id: String,
  twitter_screen_name: String,
  twitter_name: String,
  twitter_img_url: String,
  access_token: String,
  tiles: []
})

module.exports = mongoose.model('User',userSchema)
