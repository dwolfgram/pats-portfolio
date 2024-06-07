import React from 'react'

import styles from './index.module.css'

function LoadingPage() {
  return (
    <section className={styles.container}>
      <div className={styles.aboutProject}>
        <div className={`${styles.aboutSkeleton} skeleton`} />
        <br />
        {Array.from(Array(9).keys()).map((item) => {
          return <div className={`${styles.aboutSkeleton} skeleton`} key={item} />
        })}
      </div>
      <div className={styles.imagesContainer}>
        <div className={`${styles.featuredImageSkeleton} skeleton`} />
      </div>
    </section>
  )
}

export default LoadingPage
