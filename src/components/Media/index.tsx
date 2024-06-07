import { isVideo } from '@/utils'
import Image from 'next/image'
import React from 'react'

interface MediaProps {
  alt: string
  filename?: string
  url?: string
  width?: number
  height?: number
  sizes?: string
  priority?: boolean
}

function Media({ filename, url, width, height, alt, sizes = '100vw', priority }: MediaProps) {
  const mediaUrl = url || `https://pat-portfolio.s3.eu-north-1.amazonaws.com/${filename}`
  return isVideo(mediaUrl) ? (
    <video playsInline autoPlay loop muted>
      <source src={mediaUrl} />
    </video>
  ) : (
    <Image
      src={mediaUrl}
      alt={alt}
      width={width}
      height={height}
      fill={!width && !height}
      sizes={sizes}
      priority={priority}
    />
  )
}

export default Media
