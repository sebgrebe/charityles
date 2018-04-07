const User = require('../models/users')

module.exports = (access_token,cb) => {
  User.find({access_token: access_token})
  .then((user) => {
    console.log(user)
    if (user.length === 0) return cb({success: false, msg: 'no user with this access_token'})
    return cb({success: true, user: user[0]})
  })
  .catch((err) => cb({success: false, msg: err}))
}
