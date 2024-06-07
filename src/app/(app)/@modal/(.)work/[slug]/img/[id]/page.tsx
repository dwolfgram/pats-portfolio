import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import PhotoOverlay from '@/components/PhotoOverlay'

import styles from './index.module.css'
import Media from '@/components/Media'

interface ImageDetailPageProps {
  params: {
    id: string
  }
}

const getImage = async (id: string) => {
  const payload = await getPayloadHMR({
    config: configPromise,
  })
  const data = await payload.findByID({
    collection: 'media',
    id,
  })
  return data
}

async function ImageDetailPage({ params }: ImageDetailPageProps) {
  const { id } = params
  const image = await getImage(id)
  return (
    <PhotoOverlay>
      <div className={styles.imageContainer}>
        <Media
          width={image.width!}
          height={image.height!}
          url={image.url!}
          alt={image.filename!}
          priority={true}
        />
        <p className={styles.imageDescription}>{image.imageDescription}</p>
      </div>
    </PhotoOverlay>
  )
}

export default ImageDetailPage
