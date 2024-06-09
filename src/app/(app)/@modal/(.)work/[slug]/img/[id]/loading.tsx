import React from 'react'

import styles from './index.module.css'
import PhotoOverlay from '@/components/PhotoOverlay'
import { FaSpinner } from 'react-icons/fa'

function LoadingPage() {
  return (
    <PhotoOverlay>
      <div className={styles.imageContainer}>
        <div className={styles.loader}>
          <div>
            <FaSpinner size={20} color="#999" />
          </div>
        </div>
      </div>
    </PhotoOverlay>
  )
}

export default LoadingPage
