'use client'

import React from 'react'
import Media from '@/components/Media'
import { Media as MediaType } from 'payload-types'

import styles from './index.module.css'
import { useRouter } from 'next/navigation'

interface ModalProps {
  children: React.ReactNode
}

function PhotoOverlay({ children }: ModalProps) {
  const router = useRouter()

  const closeModal = () => {
    router.back()
  }

  return (
    <div onClick={closeModal} className={styles.overlay}>
      <button className={styles.closeButton}>&#x2715;</button>
      {children}
    </div>
  )
}

export default PhotoOverlay
