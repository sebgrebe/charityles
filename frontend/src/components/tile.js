import React from 'react'
import appStyles from '../styles/app.scss'
import styles from '../styles/components/tile.scss'
import axios from 'axios'

const Tile = ( {actions,data,editable} ) => {

  const deleteTile = () => {
    axios.post('/api/deleteTile',{
      id: data._id
    })
    .then((res) => {
      console.log(res)
      if (res.data.success) {
        console.log('delete successful')
        actions.updateTiles(res.data.tiles)
      }
      else {
        if (res.data.msg === "Tiles deleted, but not returned") {
          //display message
          console.log(res.data.msg)
        }
        else {
          console.log(res.data.msg)
        }
      }
    })
    .catch((err) => {console.log(err)})
  }

  const openDonate = (e,link) => {
    e.preventDefault()
    window.open(link,'_blank')
  }

  return(
    <div className={styles.tile}>
      {editable ? (
        <button onClick={() => deleteTile()} className={styles.btn}>&#10005;</button>
      ) : null
      }
      <img src={data.img.url} alt={data.img.title} className={styles.img} />
      <div className={styles.caption}>{data.caption}</div>
      {data.donate_link !== undefined && (
        <div classname={appStyles.center}>
          <button className={styles.donate} onClick={(e) => openDonate(e,data.donate_link)}>
            Donate now
          </button>
        </div>
      )}
    </div>
  )
}

export default Tile
