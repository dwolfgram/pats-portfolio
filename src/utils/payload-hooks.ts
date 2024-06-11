import { revalidateTag } from 'next/cache'
import { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload/types'

type CurriedRevalidateTagsHook = (
  tags: string[],
) => (
  params: Parameters<CollectionAfterChangeHook>[0] | Parameters<CollectionAfterDeleteHook>[0],
) => any

export const revalidateTagsHook: CurriedRevalidateTagsHook =
  (tags: string[]) =>
  ({ doc }) => {
    tags.forEach((tag) => {
      revalidateTag(tag)
    })
    return doc
  }
