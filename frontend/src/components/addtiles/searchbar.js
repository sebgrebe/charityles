import React from 'react'
import axios from 'axios'
import styles from '../../styles/components/addtiles.scss'

const SearchBar = ( {actions}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    const input = document.getElementById('search').value
    axios.post('/api/search',{
      search: input
    })
    .then((res) => {
      if (res.data.success) {
        actions.updateImgs(res.data.images)
      }
      else {
        actions.updateImgs([])
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return(
    <form onSubmit={(e) => handleSubmit(e)}>
      <input id="search" className={styles.input} placeholder="Search for image" />
      <button className={styles.btnSubmit}>Search</button>
    </form>
  )
}

export default SearchBar
