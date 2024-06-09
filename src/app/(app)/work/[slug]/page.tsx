import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { ProjectWithUpdatedImages } from '@/components/Gallery/types'
import CategoriesList from '@/components/CategoriesList'
import Media from '@/components/Media'

import styles from './index.module.css'
import { unstable_cache } from 'next/cache'

interface ProjectProps {
  params: {
    slug: string
  }
}

const getProject = unstable_cache(async (slug: string) => {
  const payload = await getPayloadHMR({
    config: configPromise,
  })
  const data = await payload.find({
    collection: 'projects',
    where: {
      urlSlug: {
        equals: slug,
      },
    },
  })
  return data.docs[0] as ProjectWithUpdatedImages
})

export async function generateMetadata({ params }: ProjectProps): Promise<Metadata> {
  const slug = params.slug
  const project = await getProject(slug)
  return {
    title: project.title,
  }
}

async function ProjectDetailsPage({ params }: ProjectProps) {
  const { slug } = params
  const project = await getProject(slug)
  return (
    <section className={styles.container}>
      <h1 className={styles.mobileTitle}>{project.title}</h1>
      <div className={styles.imagesContainer}>
        {[project.featuredImage, ...project.otherImages.map((data) => data.image)].map((image) => {
          return (
            <Link key={image.id} href={`/work/${slug}/img/${image.id}`} prefetch={false}>
              <Media
                url={`${image.url}`}
                alt={image.filename}
                sizes="(max-width: 1200px) 100vw, 50vw"
                priority={true}
              />
            </Link>
          )
        })}
      </div>
      <div className={styles.aboutProject}>
        <div className={styles.fixedContainer}>
          <h1 className={styles.title}>{project.title}</h1>
          <div className={styles.projectDetails}>
            <CategoriesList categories={project.categories} />
            {project.projectDescription && (
              <div className={styles.description}>
                <p>{project.projectDescription}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectDetailsPage
