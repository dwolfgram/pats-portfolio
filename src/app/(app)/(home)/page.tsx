import React from 'react'
import CategoriesList from '@/components/CategoriesList'

import styles from './index.module.css'
import ProjectList from '@/components/ProjectList'
import { getAllCategories, getAllProjectsByPage } from '@/actions'

const PAGE = 1
const LIMIT = 10

async function HomePage() {
  const projects = await getAllProjectsByPage(PAGE, LIMIT)
  const categories = await getAllCategories()

  return (
    <div className={styles.container}>
      <CategoriesList categories={categories} />
      <ProjectList initialData={projects} />
    </div>
  )
}

export default HomePage
