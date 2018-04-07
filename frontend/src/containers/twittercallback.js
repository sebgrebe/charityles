import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import getToken from '../helpers/gettoken'
import setCookie from '../helpers/setcookie'
import axios from 'axios'
import Home from './home'

class Twitter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authenticated: false
    }
  }

  componentDidMount() {
    const { oauth_token, oauth_verifier } = getToken(window.location.search)
    axios.post('/api/signin', {
      oauth_token: oauth_token,
      oauth_verifier: oauth_verifier
    }).then((res) => {
      if (res.data.success) {
        setCookie(res.data.user.access_token,15)
        this.props.actions.updateUser(res.data.user)
        this.props.actions.updateAuth(true)
      }
      else {
        console.log(res.data.msg)
        this.props.actions.updateAuth(false)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.state.authenticated !== this.props.state.authenticated) {
      this.setState({
        authenticated: nextProps.state.authenticated
      })
    }
  }

  render() {
    if (this.state.authenticated) {
      return(
        <div>
          <Redirect to='/' />
          <Home state={this.props.state} actions={this.props.actions}/>
        </div>
      )
    }
    else {
      return(
          <div>Callback...</div>
      )
    }
  }
}

export default Twitter
