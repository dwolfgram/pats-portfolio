'use server'

import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { ProjectWithUpdatedImages } from '@/components/Gallery/types'

export const getAllProjectsByPage = async (page: number, limit: number = 4) => {
  const payload = await getPayloadHMR({
    config: configPromise,
  })
  const data = await payload.find({
    collection: 'projects',
    page,
    limit,
    pagination: true,
  })

  return {
    ...data,
    docs: data.docs as ProjectWithUpdatedImages[],
  }
}

export const getAllCategories = async () => {
  const payload = await getPayloadHMR({
    config: configPromise,
  })
  const data = await payload.find({
    collection: 'categories',
  })
  return data.docs as ProjectWithUpdatedImages['categories']
}
