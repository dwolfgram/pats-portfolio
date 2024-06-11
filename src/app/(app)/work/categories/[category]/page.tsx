import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { ProjectWithUpdatedImages } from '@/components/Gallery/types'
import Gallery from '@/components/Gallery'
import styles from './index.module.css'
import { Metadata } from 'next'
import { getAllCategories } from '@/actions'
import CategoriesList from '@/components/CategoriesList'
import { unstable_cache } from 'next/cache'

const getCategoryId = unstable_cache(
  async (categoryName: string) => {
    const payload = await getPayloadHMR({
      config: configPromise,
    })
    const categories = await payload.find({
      collection: 'categories',
      where: {
        categoryName: {
          equals: categoryName,
        },
      },
    })
    return categories.docs[0]?.id
  },
  ['fetch-category-id'],
  { tags: ['categories'] },
)

const getProjects = (categoryId: string) =>
  unstable_cache(
    async (categoryId: string) => {
      const payload = await getPayloadHMR({
        config: configPromise,
      })
      const data = await payload.find({
        collection: 'projects',
        where: {
          categories: {
            equals: categoryId,
          },
        },
        sort: '-dateCreated',
      })
      return data.docs as ProjectWithUpdatedImages[]
    },
    ['projects-by-category'],
    { tags: [`projects/category/${categoryId}`] },
  )(categoryId)

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
  const categoryId = await getCategoryId(category)
  const projects = await getProjects(categoryId)
  const categories = await getAllCategories()

  return (
    <section className={styles.container}>
      <CategoriesList categories={categories} />
      <h3 className={styles.heading}>Category: {category}</h3>
      <Gallery projects={projects} />
    </section>
  )
}

export default CategoriesPage
