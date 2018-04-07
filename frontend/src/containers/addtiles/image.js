import React, { Component } from 'react'
import styleVars from '../../styles/_variables.scss'
import appStyles from '../../styles/app.scss'
import styles from '../../styles/components/addtiles.scss'
import no_img_found from '../../images/no_img_found.jpeg'

class SearchResult extends Component {
  constructor(props) {
    super(props)
    this.state = {
      img_no: 0,
      images: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.state.images !== this.props.state.images) {
      this.setState({
        img_no: 0,
        images: nextProps.state.images
      })
    }
  }

  noImg() {
    this.props.actions.updateImgs([{
      url: no_img_found,
      title: "No image found",
      selectable: false
    }])
  }

  pickImg(url,title) {
    this.props.actions.selectImg({
      url: url,
      title: title
    })
  }

  skipImg(val) {
    console.log(val)
    let img_no = this.state.img_no
    img_no += val
    this.setState({
      img_no: img_no
    })
  }

  render() {
    const images = this.state.images
    if (images.length === 0) {
      return null
    }
    else {
      let img = images[this.state.img_no]
      return(
        <div className={styles.containerImg}>
          <div className={styles.btnBack}>
            {images.length > 1 && this.state.img_no === 0 && (
              <button onClick = {() => null} className={appStyles.button_no_border + ' ' + appStyles.disabled}>&#8678;</button>
            )}
            {images.length > 1 && this.state.img_no !== 0 && (
              <button onClick = {() => this.skipImg(-1)} className={appStyles.button_no_border}>&#8678;</button>
            )}
          </div>
          <div className={styles.btnNext}>
            {images.length > 1 && this.state.img_no === images.length-1 && (
              <button onClick = {() => null} className={appStyles.button_no_border + ' ' + appStyles.disabled}>&#8680;</button>
            )}
            {images.length > 1 && this.state.img_no !== images.length-1 && (
              <button onClick = {() => this.skipImg(1)} className={appStyles.button_no_border}>&#8680;</button>
            )}
          </div>
          <div className={styles.img}>
            <img id="img" alt={img.title} width={styleVars['img-width']} src={img.url} onError={() => this.noImg()} onLoad={() => this.pickImg(img.url,img.title)}  />
          </div>
        </div>
      )
    }
  }
}

export default SearchResult
