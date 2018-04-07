export default (state={
  authenticated: false,
  caption: '',
  donate_link: '',
  images: [],
  img_selectable: false,
  tiles: [],
  user: null,
}, action) => {
  switch(action.type) {
    case 'SELECT_IMG':
      return {
        ...state,
        img: action.payload
      }
    case 'UPDATE_AUTH':
      return {
        ...state,
        authenticated: action.payload
      }
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload
      }
    case 'UPDATE_IMGS':
      return {
        ...state,
        images: action.payload
      }
    case 'UPDATE_CAPTION':
      return {
        ...state,
        caption: action.payload
      }
    case  'UPDATE_DONATE_LINK':
      return {
        ...state,
        donate_link: action.payload
      }
    case 'UPDATE_TILES':
      return {
        ...state,
        tiles: action.payload
      }
    default:
      return state
  }
}
