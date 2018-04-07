const Tile = require('../models/tiles')

module.exports = (id,cb) => {
  Tile.remove({_id: id})
  .then(() => {
    Tile.find({},(err,tiles) => {
      if (err) return cb({success: false, msg: "Tiles deleted, but not returned"})
      else return cb({success: true, tiles: tiles})
    })
  })
  .catch((err) => {
    return cb({success: false, msg: err})
  })
}
