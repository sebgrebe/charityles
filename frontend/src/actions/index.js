export const selectImg = (obj) => ({
  type: 'SELECT_IMG',
  payload: obj
})

export const updateAuth = (boolean) => ({
  type: 'UPDATE_AUTH',
  payload: boolean
})

export const updateUser = (obj) => ({
  type: 'UPDATE_USER',
  payload: obj
})

export const updateImgs = (arr) => ({
  type: 'UPDATE_IMGS',
  payload: arr
})

export const updateCaption = (str) => ({
  type: 'UPDATE_CAPTION',
  payload: str
})

export const updateDonateLink = (str) => ({
  type: 'UPDATE_DONATE_LINK',
  payload: str
})

export const updateTiles = (arr) => ({
  type: 'UPDATE_TILES',
  payload: arr
})
