import React from 'react'
import styles from './css/select.module.css'

function SelectBg( { setBgImg } ) {
  const handleUp = (e) => {
    const file = e.target.files[0]
    if(file) {
      const imageURL = URL.createObjectURL(file)
      setBgImg(imageURL)
    }
  } 
  return (
    <div className={styles.container}>
      <input type="file" id="file" onChange={handleUp} />
      <label htmlFor="file">Input 360 Image</label>
      {/* <div className={styles.send}>
        Send
      </div> */}
    </div>
  )
}

export default SelectBg
