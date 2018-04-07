import React, {Component} from 'react'
import axios from 'axios'
import styles from '../styles/containers/home.scss'
import styleVars from '../styles/_variables.scss'
import appStyles from '../styles/app.scss'
import Tile from '../components/tile'
import Masonry from 'react-masonry-component'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tiles: this.props.state.tiles
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.state.tiles !== this.props.state.tiles) {
      this.setState({
        tiles: nextProps.state.tiles
      })
    }
  }

  render() {
    const ColumnWidthNum = parseInt(styleVars['img-width'])
    return(
      <div>
        <h2>ChariTyles</h2>
        {this.props.state.authenticated ? (
          <h4>Welcome, {this.props.state.user.twitter_name}! </h4>
        ) : (null)}
        <Masonry className={appStyles.masonry}>
          {this.state.tiles.length === 0 ? (
            <div>
              There are no tiles to display
            </div>
          ) : (
            this.state.tiles.map((tile) =>
              <Tile data={tile} editable={false} actions={this.props.actions}/>
            )
          )}
        </Masonry>
      </div>
    )
  }
}

export default Home
