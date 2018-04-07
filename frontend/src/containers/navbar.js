import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import styles from '../styles/components/navbar.scss'
import appStyles from '../styles/app.scss'
import twitterBtn from '../images/twitter_signin.png'
import setCookie from '../helpers/setcookie'

class Navbar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      authenticated: this.props.state.authenticated,
      user: this.props.state.user
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      this.setState({
        authenticated: nextProps.state.authenticated,
        user: nextProps.state.user
      })
    }
  }

  signIn(e) {
    e.preventDefault()
    axios.post('/api/twitterRequestToken')
    .then((res) => {
      if (res.data.success) {
        window.location.replace('https://api.twitter.com/oauth/authenticate?oauth_token=' + res.data.token)
      }
      else {
        console.log('no success')
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  signOut(e) {
    e.preventDefault()
    this.props.actions.updateUser(null)
    this.props.actions.updateAuth(false)
    setCookie('',60)
  }

  render() {
    return(
      <nav className={styles.navbar + " navbar-expand-md navbar-light"}>
        <a className='navbar-brand' href="/">ChariTyles</a>
        {!this.state.authenticated ? (
          <button className={appStyles.button_no_border + ' ' + styles.twitterBtn} onClick={(e) => this.signIn(e)}>
            <img src={twitterBtn} />
          </button>
          ) : (
          <div className={styles.buttons_box}>
            <button className={styles.btn + ' nav-link'} onClick={(e) => this.signOut(e)}>Sign out</button>
            <Link className={styles.btn + ' nav-link'} to={'/user?id=' + this.state.user._id}>My Tyles</Link>
            <Link className={styles.btn + ' nav-link'} to='/addtiles'>Add Tyle</Link>
          </div>
          )
        }
      </nav>
    )
  }
}

export default Navbar
