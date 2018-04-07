require('dotenv').config()
const request = require('request')
const getParams = require('../modules/getParams.js')

module.exports = (cb) => {
    request.post({
      url: 'https://api.twitter.com/oauth/request_token',
      oauth: {
        oauth_callback: encodeURI('http://localhost:8081/sign-in-with-twitter'),
        consumer_key: process.env.TWITTER_CONSUMER_KEY,
        consumer_secret: process.env.TWITTER_CONSUMER_SECRET
      }
    },
    (err,res) => {
      if (err) return cb({success: false, msg: err})
      const token = getParams(res.body,'oauth_token')
      cb({success:true, token: token})
    }
  )
}
