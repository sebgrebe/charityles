const Tile = require('../models/tiles.js')

module.exports = (cb) => {
  Tile.find({},(err,tiles) => {
    if (err) return cb({success: false, msg: err})
    return cb({success: true, tiles: tiles})
  })
}
