import React from 'react'

import styles from './index.module.css'

function LoadingPage() {
  return (
    <section className={styles.container}>
      <div className={styles.photoContainer}>
        <div className={`${styles.featuredImageSkeleton} skeleton`} />
      </div>
      <div className={styles.aboutMeContainer}></div>
    </section>
  )
}

export default LoadingPage
