import styles from './index.module.css'
import { ProjectWithUpdatedImages } from '../types'
import Link from 'next/link'
import Media from '@/components/Media'

interface PreviewTypes {
  project: ProjectWithUpdatedImages
  sizes?: string
  priority?: boolean
}

function Preview({ project, priority, sizes = '100vw' }: PreviewTypes) {
  return (
    <div className={styles.galleryItem}>
      <Media
        url={project.featuredImage.url}
        alt={project.title}
        sizes={sizes}
        priority={priority}
      />
      <Link href={`/work/${project.urlSlug}`} prefetch={false}>
        <div className={styles.descContainer}>
          <h5>{project.title}</h5>
          <div className={styles.categoriesContainer}>
            {project.categories?.map((category, i) => (
              <p key={category.id} className={styles.category}>
                {category.categoryName}
                {i < project.categories.length - 1 && ','}
              </p>
            ))}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Preview
