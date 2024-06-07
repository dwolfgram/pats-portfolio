'use client'
import React, { useState } from 'react'
import styles from './index.module.css'
import Link from 'next/link'

import { usePathname } from 'next/navigation'
import InstagramLink from '../InstagramLink'
import { FaBars } from 'react-icons/fa'

const NAV_LINKS = [
  { label: 'Work', href: '/', pathsToMatch: ['work'] },
  { label: 'About & Contact', href: '/about', pathsToMatch: ['about'] },
]

function Nav() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const currentPath = usePathname()

  const handleToggleMobileMenu = () => {
    setShowMobileMenu((prev) => !prev)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">Patricia Pastor</Link>
      </div>
      <div className={styles.links}>
        {NAV_LINKS.map((link) => {
          const isActive =
            currentPath === link.href ||
            link.pathsToMatch.some((path) => currentPath.includes(path))
          return (
            <Link className={`${isActive && styles.active}`} key={link.label} href={link.href}>
              {link.label}
            </Link>
          )
        })}
        <InstagramLink />
      </div>
      <div onClick={handleToggleMobileMenu} className={styles.mobileMenuButton}>
        <FaBars size={20} color="#000" />
      </div>
      {showMobileMenu && (
        <div className={styles.mobileMenu}>
          <button onClick={handleToggleMobileMenu} className={styles.closeButton}>
            &#x2715;
          </button>
          <div className={styles.logo}>
            <Link href="/">Patricia Pastor</Link>
          </div>
          {NAV_LINKS.map((link, i) => {
            const isActive =
              currentPath === link.href ||
              link.pathsToMatch.some((path) => currentPath.includes(path))
            return (
              <Link
                onClick={handleToggleMobileMenu}
                className={`${isActive && styles.active} fadeInAndUp`}
                style={{ animationDelay: `${0.25 * i}s` }}
                key={link.label}
                href={link.href}
              >
                {link.label}
              </Link>
            )
          })}
          <InstagramLink size={30} />
        </div>
      )}
    </nav>
  )
}

export default Nav
