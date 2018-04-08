const setCookie = (key,var,exmin) => {
  let d = new Date()
  d.setTime(d.getTime() + exmin*60*1000)
  let expires = "expires=" + d.toUTCString()
  document.cookie = key + "=" + var + ";" + expires
}

export default setCookie
