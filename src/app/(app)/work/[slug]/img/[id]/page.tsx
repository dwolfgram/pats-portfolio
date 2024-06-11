import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

import styles from './index.module.css'
import Media from '@/components/Media'
import Link from 'next/link'
import { Metadata } from 'next'
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
    ['project-image'],
    { tags: [`project/${slug}/images`] },
  )(id, slug)

export async function generateMetadata({ params }: ImageDetailPageProps): Promise<Metadata> {
  const image = await getImage(params.id, params.slug)
  return {
    title: `${image.filename}`,
  }
}

async function ImageDetailPage({ params }: ImageDetailPageProps) {
  const { id, slug } = params
  const image = await getImage(id, slug)
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Media
          url={image.url!}
          width={image.width!}
          height={image.height!}
          alt={image.filename!}
          priority={true}
        />
        <p className={styles.imageDescription}>{image.imageDescription}</p>
        <div className={styles.link}>
          <Link href={`/work/${slug}`}>View Project</Link>
        </div>
      </div>
    </div>
  )
}

export default ImageDetailPage
