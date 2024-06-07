'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { useInView } from 'react-intersection-observer'
import { ProjectWithUpdatedImages } from '../Gallery/types'
import Gallery from '@/components/Gallery'
import { getAllProjectsByPage } from '@/actions'
import { PaginatedDocs } from 'payload/database'

import styles from './index.module.css'

interface ProjectListProps {
  initialData: PaginatedDocs<ProjectWithUpdatedImages>
}

const LIMIT = 10
let page = 2

function ProjectList({ initialData }: ProjectListProps) {
  const [projects, setProjects] = useState(initialData.docs)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMoreToLoad, setHasMoreToLoad] = useState(initialData.hasNextPage ?? false)
  const { ref, inView } = useInView()

  const handleLoadNewData = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await getAllProjectsByPage(page, LIMIT)
      setProjects((prev) => [...prev, ...data.docs])
      setHasMoreToLoad(data.hasNextPage)
      page += 1
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (inView && hasMoreToLoad) {
      handleLoadNewData()
    }
  }, [inView, handleLoadNewData, hasMoreToLoad])

  return (
    <>
      <section>
        <Gallery projects={projects} />
        {hasMoreToLoad && (
          <div ref={ref} style={{ marginTop: 500 }} className={styles.loader}>
            <div>{isLoading && <FaSpinner size={20} color="#999" />}</div>
          </div>
        )}
      </section>
    </>
  )
}

export default ProjectList
