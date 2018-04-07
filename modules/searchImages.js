const request = require('request')
require('dotenv').config()

module.exports = (search,cb) => {
  request.get({
    url: 'https://www.googleapis.com/customsearch/v1?cx=' + process.env.GOOGLE_CX + '&q=' + search + '&searchType=image&key=' + process.env.GOOGLE_API_KEY
  }, (err,r,body) => {
    if (err) return cb({success: false, msg: err})
    const results = JSON.parse(body).items
    const images = []
    results.map((item) => {
      images.push({
        url: item.link,
        title: item.title,
        height: item.image.height,
        width: item.image.width
      })
    })
    return cb({success: true, images: images})
  })
}
