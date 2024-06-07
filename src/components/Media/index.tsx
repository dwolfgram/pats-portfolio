import { isVideo } from '@/utils'
import Image from 'next/image'
import React from 'react'

interface MediaProps {
  url: string
  alt: string
  width?: number
  height?: number
  sizes?: string
  priority?: boolean
}

function Media({ url, width, height, alt, sizes = '100vw', priority }: MediaProps) {
  return isVideo(url) ? (
    <video playsInline autoPlay loop muted>
      <source src={url} />
    </video>
  ) : (
    <Image
      src={url}
      alt={alt}
      width={width}
      height={height}
      fill={!width && !height}
      sizes={sizes}
      priority={priority}
      quality={50}
    />
  )
}

export default Media
