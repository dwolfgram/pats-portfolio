'use client'

import React from 'react'
import Preview from './Preview'
import { ProjectWithUpdatedImages } from './types'

import styles from './index.module.css'
import Masonry from 'react-masonry-css'

interface GalleryProps {
  projects: ProjectWithUpdatedImages[]
}

function Gallery({ projects }: GalleryProps) {
  return (
    <Masonry
      breakpointCols={{ 768: 1, 1000: 2, 1280: 3, 1440: 4, 2000: 4, default: 4 }}
      className={styles.gallery}
    >
      {projects.map((project, i) => (
        <div
          key={project.id}
          className="fadeInAndUp"
          style={{ animationDelay: `${0.25 * (i % 10)}s` }}
        >
          <Preview
            project={project}
            sizes={
              '(max-width: 1280px) 33vw, (max-width: 1000px) 50vw, (max-width: 768px) 100vw, 25vw'
            }
            priority={true}
          />
        </div>
      ))}
    </Masonry>
  )
}

export default Gallery
