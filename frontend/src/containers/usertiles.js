import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import Masonry from 'react-masonry-component'
import Tile from '../components/tile'
import Status404 from '../components/status404'
import axios from 'axios'
import appStyles from '../styles/app.scss'

class UserTiles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_tiles: [],
      user: null,
      error: false,
      myTiles: false
    }
  }

  componentDidMount() {
    const user_id = window.location.search.substring(4,window.location.search.length)
    this.setState({
      user_id: user_id
    })
    this.getUserTiles(user_id)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.state.tiles !== this.props.state.tiles) {
      this.getUserTiles(this.state.user_id)
    }
    else if (nextProps.state.authenticated !== this.props.state.authenticated) {
      const myTiles = (this.state.user_id === nextProps.state.user_id)
      this.setState({
        myTiles: myTiles
      })
    }
  }

  getUserTiles(user_id) {
    axios.get('/api/usertiles?id=' + user_id)
    .then((res) => {
      if (res.data.success) {
        this.setState({
          user_tiles: res.data.tiles,
          user: res.data.user
        })
        if (this.props.state.user !== null) {
          if (this.state.user_id === this.props.state.user._id)
          this.setState({
            myTiles: true
          })
        }
      }
      else {
        this.setState({
          error: true
        })
      }
    })
    .catch((err) => {console.log(err)})
  }

  render() {
    const user_name = (this.state.user === null) ? 'Unknown user' : this.state.user.twitter_name
    if (this.state.error) {
      return(
        <Status404 />
      )
    }
    else {
      return(
        <div>
          <h2>{user_name}&#8217;s Tyles</h2>
          {this.state.user_tiles.length > 0 ? (
            <Masonry className={appStyles.masonry}>
              {this.state.user_tiles.map((tile) =>
              <Tile data={tile} actions={this.props.actions} editable={this.state.myTiles}/>
              )}
            </Masonry>
          ) : (
            <div>
              {user_name} does not have any tiles.
            </div>
          )}
        </div>
      )
    }
  }
}

export default UserTiles
