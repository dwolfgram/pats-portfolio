'use client'

import React from 'react'
import styles from './index.module.css'
import { NAV_LINKS } from '../Nav'
import Link from 'next/link'
import InstagramLink from '../InstagramLink'
import { Fragment } from 'react'

function Footer() {
  return (
    <div className={styles.container}>
      <div>
        <p>© {new Date().getFullYear()} by Patricia Pastor Soto</p>
        <p>
          Made with ❤️‍🔥 by{' '}
          <Link
            href="https://instagram.com/dan_wolfstagram"
            target="_blank noreferrer"
            prefetch={false}
          >
            dan
          </Link>
        </p>
      </div>
      <div className={styles.links}>
        {NAV_LINKS.map((link, i) => {
          return (
            <Fragment key={link.label}>
              <p>
                <Link href={link.href} prefetch={false}>
                  {link.label}
                </Link>
              </p>
              {i <= NAV_LINKS.length - 1 && '·'}
            </Fragment>
          )
        })}
        <InstagramLink />
      </div>
    </div>
  )
}

export default Footer
