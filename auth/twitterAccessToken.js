require('dotenv').config()
const request = require('request')
const getParams = require('../modules/getParams')

module.exports = (data,cb) => {
  request.post({
    url: 'https://api.twitter.com/oauth/access_token?oauth_verifier',
    oauth: {
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      token: data.oauth_token
    },
    form: {
      oauth_verifier: data.oauth_verifier
    }
  }, (err,r,body) => {
    console.log(r)
    if (err) return cb({success: false, msg: err})
    if (r.statusCode === 200) {
      const data = {
        auth: {
          oauth_token: getParams(body,'oauth_token'),
          oauth_token_secret: getParams(body,'oauth_token_secret'),
        },
        user: {
          twitter_user_id: getParams(body,'user_id'),
          twitter_screen_name: getParams(body,'screen_name')
        }
      }
      return cb({success: true, data: data})
    }
    else {return cb({success: false, msg: body})}
  })
}
