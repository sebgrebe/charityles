const addTile = require('./modules/addTile')
const getAllTiles = require('./modules/getAllTiles')
const getUserTiles = require('./modules/getUserTiles')
const deleteTile = require('./modules/deleteTile')
const checkAccessToken = require('./auth/checkAccessToken')
const twitterRequestToken = require('./auth/twitterRequestToken')
const twitterAccessToken = require('./auth/twitterAccessToken')
const getTwitterUser = require('./auth/getTwitterUser')
const checkUser = require('./auth/checkUser')
const searchImages = require('./modules/searchImages')

module.exports = (app) => {

  app.post('/api/addTile',(req,res) => {
    addTile(req.body,(result) => {
      res.send(result)
    })
  })

  app.get('/api/allTiles',(req,res) => {
    getAllTiles((result) => {
      res.send(result)
    })
  })

  app.get('/api/usertiles',(req,res) => {
    console.log(req.query.id)
    getUserTiles((req.query.id),(result) => {
      res.send(result)
    })
  })

  app.post('/api/deleteTile',(req,res) => {
    deleteTile(req.body.id,(result) => {
      res.send(result)
    })
  })

  app.get('/api/user',(req,res) => {
    checkAccessToken(req.headers.access_token,(result) => {
      res.send(result)
    })
  })

  app.post('/api/twitterRequestToken',(req,res) => {
    twitterRequestToken((result) => {
      res.send(result)
    })
  })

  app.post('/api/signin',(req,res) => {
    twitterAccessToken(req.body,(result1) => {
      if (result1.success) {
        getTwitterUser(result1.data,(result2) => {
          if (!result2.success) {res.send(result2)}
          else {
            checkUser(result1.data.auth,result2.user,(result3) => {
              res.send(result3)
            })
          }
        })
      }
      else {res.send(result1)}
    })
  })

  app.post('/api/search',(req,res) => {
    searchImages(req.body.search,(result) => {
      res.send(result)
    })
  })
}
