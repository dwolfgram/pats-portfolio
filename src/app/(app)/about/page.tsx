import Media from '@/components/Media'
import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import styles from './index.module.css'
import Link from 'next/link'
import { unstable_cache } from 'next/cache'
import InstagramLink from '@/components/InstagramLink'
import { FaRegEnvelope } from 'react-icons/fa'

export const metadata = {
  title: 'About & Contact',
}

const getAboutPageTitleData = async () => {
  const payload = await getPayloadHMR({
    config: configPromise,
  })
  const data = await payload.find({
    collection: 'aboutPageData',
    where: {
      fieldName: {
        equals: 'About Page Title',
      },
    },
  })
  return data.docs[0]
}

const getAboutPageBodyData = async () => {
  const payload = await getPayloadHMR({
    config: configPromise,
  })
  const data = await payload.find({
    collection: 'aboutPageData',
    where: {
      fieldName: {
        equals: 'About You Text',
      },
    },
  })
  return data.docs[0]
}

const getAboutPageEmailData = async () => {
  const payload = await getPayloadHMR({
    config: configPromise,
  })
  const data = await payload.find({
    collection: 'aboutPageData',
    where: {
      fieldName: {
        equals: 'email',
      },
    },
  })
  return data.docs[0]
}

const getAboutPageImageData = async () => {
  const payload = await getPayloadHMR({
    config: configPromise,
  })
  const data = await payload.find({
    collection: 'aboutPageData',
    where: {
      fieldName: {
        equals: 'image url',
      },
    },
  })
  return data.docs[0]
}

const fetchAboutPageData = unstable_cache(
  async () => {
    const [image, title, body, email] = await Promise.all([
      await getAboutPageImageData(),
      await getAboutPageTitleData(),
      await getAboutPageBodyData(),
      await getAboutPageEmailData(),
    ])

    return { image, title, body, email }
  },
  ['about-page'],
  { tags: ['about'] },
)

async function AboutPage() {
  const { image, title, body, email } = await fetchAboutPageData()

  return (
    <section className={styles.container}>
      <div className={styles.photoContainer}>
        <div className={styles.pictures}>
          <Media url={image.aboutText!} alt="About Pat the artist" priority={true} />
        </div>
      </div>
      <div className={styles.aboutMeContainer}>
        <div className={styles.flowers}>
          <Media
            url={'https://i.pinimg.com/originals/17/1f/da/171fdabae8e7290ae6df229f6e10c018.png'}
            alt="flower"
            height={75}
            width={53}
            priority={true}
          />
        </div>
        <h1>{title.aboutText}</h1>
        <p>{body.aboutText}</p>
        <div className={styles.socialsContainer}>
          <div className={`${styles.social} ${styles.ig}`}>
            <InstagramLink />
            <Link href="https://instagram.com/paintingpatri">@paintingpatri</Link>
          </div>
          <div className={`${styles.social} ${styles.email}`}>
            <FaRegEnvelope size={22} />
            {email.aboutText}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPage
