import Media from '@/components/Media'
import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import styles from './index.module.css'
import InstagramLink from '@/components/InstagramLink'

export const metadata = {
  title: 'About & Contact',
}

const getAboutPageTitleData = async () => {
  'use server'
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
  'use server'
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
  'use server'
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
  'use server'
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

async function AboutPage() {
  const title = await getAboutPageTitleData()
  const body = await getAboutPageBodyData()
  const email = await getAboutPageEmailData()
  const image = await getAboutPageImageData()

  return (
    <section className={styles.container}>
      <div className={styles.photoContainer}>
        <div className={styles.pictures}>
          <Media
            url={`https://pat-portfolio.s3.eu-north-1.amazonaws.com/${image.aboutText!}`}
            alt="About Pat the artist"
            priority={true}
          />
        </div>
      </div>
      <div className={styles.aboutMeContainer}>
        <div className={styles.flowers}>
          {new Array(1)
            .fill(
              <Media
                url={'https://i.pinimg.com/originals/17/1f/da/171fdabae8e7290ae6df229f6e10c018.png'}
                alt="flower"
                height={75}
                width={53}
                priority={true}
              />,
            )
            .map((image) => image)}
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
