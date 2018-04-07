import React from 'react'
import styles from '../../styles/components/addtiles.scss'

const Message = ( {type,handleCheck} ) => {
  return(
    <div>
      {type === 'link' && (
        <div className={styles.msg + ' alert alert-warning'}>
          <p>Are you sure you don&#8217;t want to add a donation link? This would make it easier for users to donate to this charity</p>
          <button className={styles.btnMsg} onClick={(e) => handleCheck(e,true)}>Yes</button>
          <button className={styles.btnMsg} onClick={(e) => handleCheck(e,false)}>No</button>
        </div>
      )}
      {type === 'success' && (
        <div className={styles.msg + ' alert alert-success'}>
          Yay! Your tyle has been added.
        </div>
      )}
    </div>
  )
}

export default Message
