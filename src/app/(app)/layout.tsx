import React from 'react'
import './globals.scss'
import { Inter } from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: {
    template: '%s | Patricia Pastor Illustration',
    default: 'Patricia Pastor Illustration',
  },
  description: 'Patricia Pastor is a graphic designer and animator based in Valencia, Spain.',
  keywords: 'graphic designer, valencia, motion designer, spain, remote work, freelancer, artist',
  // openGraph: {
  //   title: 'Patricia Pastor Illustration',
  //   description: 'Patricia Pastor is a graphic designer and animator based in Valencia, Spain.',
  //   url: 'https://yourwebsite.com',
  //   images: [
  //     {
  //       url: 'https://yourwebsite.com/path-to-your-image.jpg',
  //       width: 800,
  //       height: 600,
  //       alt: 'Description of the image',
  //     },
  //   ],
  // },
  // twitter: {
  //   card: 'summary_large_image',
  //   site: '@yourTwitterHandle',
  //   title: 'Your Page Title',
  //   description: 'Your page description',
  //   image: 'https://yourwebsite.com/path-to-your-image.jpg',
  // },
}

const Layout: React.FC<{ children: React.ReactNode; modal: React.ReactNode }> = ({
  children,
  modal,
}) => {
  return (
    <html className={inter.className}>
      <body>
        <Nav />
        <main>
          {modal}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

export default Layout
