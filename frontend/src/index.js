import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import registerServiceWorker from './registerServiceWorker'
import history from './history'

let store = createStore(reducer)

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'))

registerServiceWorker()
