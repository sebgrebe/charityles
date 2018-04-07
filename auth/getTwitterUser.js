const request = require('request')

module.exports = (data,cb) => {
  const oauth_token = data.auth.oauth_token
  const oauth_token_secret = data.auth.oauth_token_secret
  const url = 'https://api.twitter.com/1.1/users/show.json?screen_name='+data.user.twitter_screen_name
  request.get({
    url: url,
    oauth: {
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      token: oauth_token,
      token_secret: oauth_token_secret
    }
  }, (err,r,body) => {
    if (err) return cb({success: false, msg: err})
    body = JSON.parse(body)
    const user = {
      twitter_user_id: body.id_str,
      twitter_screen_name: body.screen_name,
      twitter_name: body.name,
      twitter_img_url: body.profile_image_url
    }
    return cb({success: true, user: user})
  })
}
