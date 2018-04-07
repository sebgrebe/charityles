module.exports = (str,token_type) => {
  const str_short = str.substring(str.indexOf(token_type)+token_type.length+1,str.length)
  let token = ''
  let i = 0
  while (i < str_short.length && str_short.charAt(i) !== '&') {
    token += str_short.charAt(i)
    i++
  }
  return token
}
