const User = require('../models/users')
const Tile = require('../models/tiles')

module.exports = (user_id,cb) => {
  User.find({_id: user_id}, (err,user) => {
    console.log(user)
    if (err) return cb({success: false, msg: err })
    if (!user) return cb({success: false, msg: 'user does not exist'})
    else {
      Tile.find({owner_id: user_id}, (err,tiles) => {
        console.log(tiles)
        if (err) return cb({success: false, msg: 'Could not retrieve tiles'})
        if (!tiles) return cb({success: true, tiles: []})
        else return cb({success: true, tiles: tiles, user: user[0]})
      })
    }
  })
}
