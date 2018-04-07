const setCookie = (access_token, exmin) => {
  let d = new Date()
  d.setTime(d.getTime() + exmin*60*1000)
  let expires = "expires=" + d.toUTCString()
  document.cookie = "access_token=" + access_token + ";" + expires
}

export default setCookie
