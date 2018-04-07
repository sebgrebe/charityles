import React from 'react'
import styles from '../../styles/components/addtiles.scss'

const AddCaption = ( {actions} ) => {
  const handleChange = (e) => {
    let caption = document.getElementById('caption').value
    actions.updateCaption(caption)
  }

  return(
    <textarea id="caption" placeholder="Caption" className={styles.inputWide} onChange={(e) => handleChange(e)}>
    </textarea>
    )
}

export default AddCaption
