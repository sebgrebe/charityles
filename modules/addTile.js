const Tile = require('../models/tiles')
const getAllTiles = require('./getAllTiles')

module.exports = (data,cb) => {
  let tile = new Tile()
  tile.img = {
    url: data.img.url,
    title: data.img.title
  }
  tile.owner_id = data.owner_id
  tile.caption = data.caption
  tile.donate_link = data.donate_link
  tile.save().then(() => {
    getAllTiles((result) => {
      if (result.success) {
        return cb({success: true, tiles: result.tiles})
      }
      else {
        return cb({success: true, tiles: []})
      }
    })
  })
  .catch((err) => {return cb({success: false, msg: err})})
}
