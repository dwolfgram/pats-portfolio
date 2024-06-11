import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import PhotoOverlay from '@/components/PhotoOverlay'

import styles from './index.module.css'
import Media from '@/components/Media'
import { unstable_cache } from 'next/cache'

interface ImageDetailPageProps {
  params: {
    id: string
    slug: string
  }
}

const getImage = (id: string, slug: string) =>
  unstable_cache(
    async (id: string, slug: string) => {
      const payload = await getPayloadHMR({
        config: configPromise,
      })
      const data = await payload.findByID({
        collection: 'media',
        id,
      })
      return data
    },
    ['modal-project-image'],
    { tags: [`project/${slug}/images`] },
  )(id, slug)

async function ImageDetailPage({ params }: ImageDetailPageProps) {
  const { id, slug } = params
  const image = await getImage(id, slug)
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
