import Link from 'next/link'
import React from 'react'
import { FaInstagram } from 'react-icons/fa'

interface InstagramLinkProps {
  size?: number
  color?: string
}

function InstagramLink({ size = 24, color }: InstagramLinkProps) {
  return (
    <Link href="https://instagram.com/paintingpatri" target="_blank">
      <FaInstagram size={size} color={color} />
    </Link>
  )
}

export default InstagramLink
