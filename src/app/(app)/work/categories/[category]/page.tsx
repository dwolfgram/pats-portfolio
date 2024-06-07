import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { ProjectWithUpdatedImages } from '@/components/Gallery/types'
import Gallery from '@/components/Gallery'
import styles from './index.module.css'
import { Metadata } from 'next'

const getProjects = async (category: string) => {
  'use server'
  const payload = await getPayloadHMR({
    config: configPromise,
  })
  const categories = await payload.find({
    collection: 'categories',
    where: {
      categoryName: {
        equals: category,
      },
    },
  })
  const categoryId = categories.docs[0]?.id
  const data = await payload.find({
    collection: 'projects',
    where: {
      categories: {
        equals: categoryId,
      },
    },
  })
  return data.docs as ProjectWithUpdatedImages[]
}

interface CategoriesPageProps {
  params: {
    category: string
  }
}

export function generateMetadata({ params }: CategoriesPageProps): Metadata {
  const category = params.category
  return {
    title: `${category} Works`,
  }
}

async function CategoriesPage({ params }: CategoriesPageProps) {
  const { category } = params
  const projects = await getProjects(category)

  return (
    <section className={styles.container}>
      <h3 className={styles.heading}>Category: {category}</h3>
      <Gallery projects={projects} />
    </section>
  )
}

export default CategoriesPage
