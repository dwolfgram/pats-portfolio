import Media from '@/components/Media'
import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import styles from './index.module.css'
import InstagramLink from '@/components/InstagramLink'
import { unstable_cache } from 'next/cache'

export const metadata = {
  title: 'About & Contact',
}

const getAboutPageTitleData = unstable_cache(async () => {
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
})

const getAboutPageBodyData = unstable_cache(async () => {
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
})

const getAboutPageEmailData = unstable_cache(async () => {
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
})

const getAboutPageImageData = unstable_cache(async () => {
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
})

const fetchAboutPageData = async () => {
  const image = await getAboutPageImageData()
  const title = await getAboutPageTitleData()
  const body = await getAboutPageBodyData()
  const email = await getAboutPageEmailData()

  return { image, title, body, email }
}

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
        <div>
          <h4>Get in touch for commissions or just to say hi!!</h4>
          <div className={styles.contact}>
            <div>
              <span>Email </span>
              <span>{email.aboutText}</span>
            </div>
            <div>
              <span style={{ position: 'relative', top: 3 }}>
                <InstagramLink size={20} />
              </span>
              <span> @paintingpatri</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutPage
