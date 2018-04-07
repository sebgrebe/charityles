import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../../components/addtiles/searchbar'
import Image from './image'
import AddURL from '../../components/addtiles/addurl'
import AddCaption from '../../components/addtiles/addcaption'
import AddDonateLink from '../../components/addtiles/adddonatelink'
import Message from '../../components/addtiles/message'
import appStyles from '../../styles/app.scss'
import styles from '../../styles/components/addtiles.scss'
import axios from 'axios'

class AddTiles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      msg_type: null,
      img: null
    }
    this.handleCheck = this.handleCheck.bind(this)
    this.selectImg = this.selectImg.bind(this)
  }

  handleCheck(e,save) {
    e.preventDefault(e)
    if (save) {
      this.saveTile()
    }
    else {
      this.setState({
        msg_type: null
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.props.state.donate_link !== '') {
      this.saveTile()
    }
    else {
      this.setState({
        msg_type: 'link'
      })
    }
  }

  selectImg(img) {
    this.setState({
      img: img
    })
  }

  saveTile() {
    axios.post('/api/addTile', {
      owner_id: this.props.state.user._id,
      img: this.props.state.img,
      caption: this.props.state.caption,
      donate_link: this.props.state.donate_link
    }).then((res) => {
      if (res.data.success) {
        this.setState({
          msg_type: 'success'
        })
      }
      else {
        console.log(res.data.msg)
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  render() {
    return(
      <div className={appStyles.center}>
        <h2>Add a Tyle</h2>
        {this.state.msg_type === 'link' && (
          <Message type='link' handleCheck={this.handleCheck} />
        )}
        {this.state.msg_type === 'success' && (
          <Message type='success' handleCheck={this.handleCheck} />
        )}
        {this.props.state.authenticated ? (
          <div className={styles.containerOuter}>
            <div className={styles.containerInner}>
              <div className={styles.column + ' ' + styles.left}>
                <div className={styles.info}>You can either search for an image or add a URL manually.</div>
                <SearchBar state={this.props.state} actions={this.props.actions} />
                <AddURL state={this.props.state} selectImg={this.selectImg}/>
                <div className={styles.info}>Add a caption to describe the charity.</div>
                <AddCaption actions={this.props.actions} />
                <div className={styles.info}>Add a link to a page where users can donate.</div>
                <AddDonateLink actions={this.props.actions} />
              </div>
              <div className={styles.column + ' ' + styles.right}>
                <Image state={this.props.state} actions={this.props.actions} selectImg={this.selectImg}/>
              </div>
            </div>
            <div className={styles.btnAddTileContainer}>
              {this.state.img !== null ? (
                  <button onClick={(e) => this.handleSubmit(e)} className={styles.btnAddTile}>Add Tyle</button>
              ) : (
                  <button className={appStyles.disabled + ' ' + styles.btnAddTile} onSubmit={() => null}>Add Tile</button>
              )}
            </div>
          </div>
        ) : (
          <p>You need to sign in to add tiles</p>
        )}
      </div>
    )
  }
}

export default AddTiles
