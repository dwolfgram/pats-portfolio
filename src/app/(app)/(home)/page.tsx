import React from 'react'
import CategoriesList from '@/components/CategoriesList'

import styles from './index.module.css'
import ProjectList from '@/components/ProjectList'
import { getAllCategories, getAllProjectsByPage } from '@/actions'

const PAGE = 1
const LIMIT = 10

const getData = async (page: number, limit: number) => {
  const projects = await getAllProjectsByPage(page, limit)
  const categories = await getAllCategories()
  return { projects, categories }
}

async function HomePage() {
  const { projects, categories } = await getData(PAGE, LIMIT)

  return (
    <div className={styles.container}>
      <CategoriesList className={styles.categories} categories={categories} />
      <ProjectList initialData={projects} />
    </div>
  )
}

export default HomePage
