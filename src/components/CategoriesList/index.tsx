import React from 'react'
import styles from './index.module.css'
import { ProjectWithUpdatedImages } from '../Gallery/types'
import Link from 'next/link'

interface CategoriesListProps extends React.HTMLAttributes<HTMLDivElement> {
  categories: ProjectWithUpdatedImages['categories']
  comma?: boolean
}

function CategoriesList({ categories, comma, className, ...props }: CategoriesListProps) {
  return (
    <div className={`${styles.categoriesContainer} ${className}`} {...props}>
      {categories!
        .sort((a, b) => a.categoryName.localeCompare(b.categoryName))
        .map((category, i) => (
          <Link
            key={category.id}
            href={`/work/categories/${category.categoryName}`}
            prefetch={false}
          >
            <div className={styles.category}>
              {category.categoryName}
              {comma && i < categories.length - 1 && ','}
            </div>
          </Link>
        ))}
    </div>
  )
}

export default CategoriesList
