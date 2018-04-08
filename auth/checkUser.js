const User = require('../models/users.js')

const saveUser = (user,cb) => {
  user.save().then((user_saved) => {
    return cb({success: true, user: user_saved})
  }).catch((err) => {
    return cb({success: false, msg: err})
  })
}

module.exports = (auth,user_data,cb) => {
  User.findOne({
    twitter_user_id: user_data.twitter_user_id
  },
  (err,user) => {
    if (err) return cb({success: false, msg: err})
    if (user) {
        user.access_token = auth.oauth_token
        saveUser(user,cb)
    }
    else {
      let user = new User()
      user.twitter_user_id = user_data.twitter_user_id
      user.twitter_screen_name = user_data.twitter_user_screen_name
      user.twitter_name = user_data.twitter_name
      user.twitter_img_url = user_data.twitter_img_url
      user.access_token = auth.oauth_token
      saveUser(user,cb)
    }
  })
}
