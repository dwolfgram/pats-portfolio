'use client'

import React from 'react'
import styles from './index.module.css'

function Footer() {
  return (
    <div className={styles.container}>
      <p>
        Made with ❤️‍🔥 by{' '}
        <a href="https://instagram.com/dan_wolfstagram" target="_blank noreferrer">
          dan
        </a>
      </p>
      <p>© Patricia Pastor Soto - {new Date().getFullYear()}</p>
    </div>
  )
}

export default Footer
