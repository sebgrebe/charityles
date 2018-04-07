const getToken = (str) => {
  const oauth_token = str.substring(str.indexOf('oauth_token=')+12,str.indexOf('&oauth'))
  const oauth_verifier = str.substring(str.indexOf('oauth_verifier')+15,str.length)
  return {
    oauth_token: oauth_token,
    oauth_verifier: oauth_verifier
  }
}

export default getToken
