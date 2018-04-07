const getCookie = (cookie_name) => {
  const cookie = decodeURIComponent(document.cookie)
  const cookie_array = cookie.split(';')
  for (var i=0; i < cookie_array.length; i++) {
    const cookie_i = cookie_array[i]
    if (cookie_i.indexOf(cookie_name+'=') > -1) {
      console.log(cookie_i)
      return {
        success: true,
        cookie_val: cookie_i.substring(cookie_name.length+2,cookie_i.length)
      }
    }
  }
  return {
    success: false,
    msg: 'Couldn\'t find cookie with that name'
  }
}

export default getCookie
