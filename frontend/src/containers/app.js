import React, { Component } from 'react'
import '../styles/App.scss'
import { Route, Redirect, withRouter, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import axios from 'axios'
import getCookie from '../helpers/getcookie'
import Home from './home'
import UserTiles from './usertiles'
import TwitterCallback from './twittercallback'
import AddTiles from './addtiles/index'
import Status404 from '../components/Status404'
import Navbar from './navbar'
import * as Actions from '../actions/index'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    //get user (if authenticated)
    if (!this.props.state.authenticated) {
      const cookie = getCookie('access_token')
      if (cookie.success) {
        axios.get('/api/user',{
          'headers': {
            access_token: cookie.cookie_val
          }
        })
        .then((res) => {
          if (res.data.success) {
            this.props.actions.updateUser(res.data.user)
            this.props.actions.updateAuth(true)
          }
          else {
            console.log('no user authenticated')
          }
        })
        .catch((err) => {
          console.log(err)
        })
      }
    }

    //get tiles
    axios.get('/api/allTiles')
    .then((res) => {
      if (res.data.success) {
        this.props.actions.updateTiles(res.data.tiles)
      }
    })
    .catch((err) => {console.log(err)})
  }

  render() {
    console.log('Hi heroku')
    return (
      <div>
        <Navbar state={this.props.state} actions={this.props.actions}/>
        <div className='container'>
          <Switch>
            <Route exact path = '/' render={(props) => <Home state={this.props.state} actions={this.props.actions} />} />
            <Route path = '/addtiles' render={(props) => <AddTiles state={this.props.state} actions={this.props.actions}/>} />
            <Route path = '/sign-in-with-twitter' render={(props) => <TwitterCallback actions={this.props.actions} state={this.props.state}/> } />
            <Route path = '/user' render={(props) => <UserTiles actions={this.props.actions} state={this.props.state} />} />
            <Route component={Status404} />
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  state: state
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
