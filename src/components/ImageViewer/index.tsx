'use client'

import React, { useState } from 'react'
import Media from '../Media'
import { moveItemToFrontOfArray } from '@/utils'
import { ProjectImage } from '../Gallery/types'
import styles from './index.module.css'

interface ImageViewerProps {
  images: ProjectImage[]
}

function ImageViewer({ images: imageList }: ImageViewerProps) {
  const [images, setImages] = useState(imageList)

  const handleChangeFeaturedImage = (image: (typeof images)[number]) => {
    setImages((prev) => moveItemToFrontOfArray(prev, image))
  }

  return (
    <div className={styles.container}>
      <div className={styles.featuredImageContainer}>
        <Media url={images[0].url} alt={images[0].filename} />
      </div>
      {images.length > 1 && (
        <div className={styles.otherImagesContainer}>
          {images.slice(1).map((image) => {
            return (
              <div key={image.url} onClick={() => handleChangeFeaturedImage(image)}>
                <Media url={image.url} alt={image.filename} />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ImageViewer
