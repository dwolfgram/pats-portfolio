import React from 'react'
import styles from './index.module.css'
import { ProjectWithUpdatedImages } from '../Gallery/types'
import Link from 'next/link'

interface CategoriesListProps {
  categories: ProjectWithUpdatedImages['categories']
}

function CategoriesList({ categories }: CategoriesListProps) {
  return (
    <div className={styles.categoriesContainer}>
      {categories!
        .sort((a, b) => a.categoryName.localeCompare(b.categoryName))
        .map((category) => (
          <Link key={category.id} href={`/work/categories/${category.categoryName}`}>
            <div className={styles.category}>{category.categoryName}</div>
          </Link>
        ))}
    </div>
  )
}

export default CategoriesList
