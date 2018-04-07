import React from 'react'
import styles from '../../styles/components/addtiles.scss'

const AddDonateLink = ( {actions} ) => {
  const handleChange = (e) => {
    let donate_link = document.getElementById('donate_link').value
    actions.updateDonateLink(donate_link)
  }

  return(
    <input id="donate_link" placeholder="Link to donation site" className={styles.inputWide} onChange={(e) => handleChange(e)} />
    )
}

export default AddDonateLink
