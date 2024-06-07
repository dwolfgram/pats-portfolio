import React from 'react'

import styles from './index.module.css'

function GalleryLoader() {
  return (
    <div className={styles.gallery}>
      {Array.from(Array(9).keys()).map((item) => {
        return <div className={`${styles.galleryItem} skeleton`} key={item} />
      })}
    </div>
  )
}

export default GalleryLoader
