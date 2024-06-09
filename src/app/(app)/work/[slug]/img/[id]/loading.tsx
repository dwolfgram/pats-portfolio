import React from 'react'

import styles from './index.module.css'

function LoadingPage() {
  return (
    <section className={styles.container}>
      <div className={styles.imageContainer}>
        <div className={`${styles.imageSkeleton} skeleton`} />
      </div>
    </section>
  )
}

export default LoadingPage
