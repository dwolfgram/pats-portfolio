import { Project } from 'payload-types'

export interface ProjectImage {
  id: string
  filename: string
  mimeType: string
  filesize: number
  width: number
  height: number
  focalX: number
  focalY: number
  createdAt: string
  updatedAt: string
  url: string
  thumbnailURL: string | null
}

export interface Category {
  id: string
  filename: string
  mimeType: string
  filesize: number
  width: number
  height: number
  focalX: number
  focalY: number
  createdAt: string
  updatedAt: string
  url: string
  thumbnailURL: string | null
}

export type ProjectWithUpdatedImages = Omit<
  Project,
  'featuredImage' | 'otherImages' | 'categories'
> & {
  featuredImage: ProjectImage & { id: string }
  otherImages: ({ image: ProjectImage } & { id: string })[]
  categories: { id: string; categoryName: string }[]
}
