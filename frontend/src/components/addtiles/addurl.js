import React from 'react'
import styles from '../../styles/components/addtiles.scss'

const AddURL = ( {state,actions} ) => {

  const handleSubmit = (e) => {
    e.preventDefault()
    const image_url = document.getElementById('image_url').value
    actions.updateImgs([{
      url: image_url,
      title: 'No title'
    }])
  }

  return(
    <form onSubmit={(e) => handleSubmit(e)}>
      <input id="image_url" className={styles.input} placeholder="URL of image" />
      <button className={styles.btnSubmit}>Add</button>
    </form>
  )
}

export default AddURL
