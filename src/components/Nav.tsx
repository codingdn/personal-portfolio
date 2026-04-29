'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCommandPalette } from '@/components/CommandPalette'
import Image from 'next/image'

const navLinks = [
  { label: 'About', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Photography', to: '/photography' },
]

const socialLinks = [
  { href: 'https://www.linkedin.com/in/daneil-nguyen/', src: '/assets/linkedin.svg', alt: 'LinkedIn' },
  { href: 'https://github.com/codingdn', src: '/assets/github.svg', alt: 'GitHub' },
  { href: 'https://www.instagram.com/badpicsinc/', src: '/assets/instagram.svg', alt: 'Instagram' },
  { href: 'mailto:danthedevnguyen@gmail.com', src: '/assets/mail.svg', alt: 'Email' },
]

function isLinkActive(to: string, pathname: string) {
  return to === '/' ? pathname === '/' : pathname.startsWith(to)
}

function navClass(isActive: boolean) {
  return `text-sm transition-colors duration-150 ${
    isActive ? 'text-[#C2410C]' : 'text-[#737373] dark:text-[#a3a3a3] hover:text-[#111111] dark:hover:text-[#f5f5f5]'
  }`
}

function mobileNavClass(isActive: boolean) {
  return `text-left py-3 text-sm border-b border-[#F5F5F5] dark:border-[#222] last:border-b-0 ${
    isActive ? 'text-[#C2410C]' : 'text-[#737373] dark:text-[#a3a3a3]'
  }`
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { open: openPalette } = useCommandPalette()
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-[#111111] border-b border-[#E5E5E5] dark:border-[#222]">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-medium text-[#111111] dark:text-[#f5f5f5] text-sm tracking-tight"
        >
          Daneil Nguyen
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              href={to}
              className={navClass(isLinkActive(to, pathname))}
            >
              {label}
            </Link>
          ))}

          {/* ⌘K hint */}
          <button
            onClick={openPalette}
            className="text-[11px] font-mono text-[#C0C0C0] dark:text-[#444] hover:text-[#737373] dark:hover:text-[#a3a3a3] border border-[#E5E5E5] dark:border-[#2a2a2a] rounded-md px-2 py-1 transition-colors"
            aria-label="Open command palette"
          >
            ⌘K
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-[#E5E5E5] dark:border-[#2a2a2a]">
            {socialLinks.map(({ href, src, alt }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="opacity-40 hover:opacity-100 transition-opacity duration-150"
                aria-label={alt}
              >
                <Image src={src} alt={alt} width={16} height={16} className="dark:invert" />
              </a>
            ))}
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-11 h-11 -mr-2"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span className={`block h-px w-5 mx-auto bg-[#111111] dark:bg-[#f5f5f5] transition-all duration-200 origin-center ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block h-px w-5 mx-auto bg-[#111111] dark:bg-[#f5f5f5] transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-px w-5 mx-auto bg-[#111111] dark:bg-[#f5f5f5] transition-all duration-200 origin-center ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-white dark:bg-[#111111] border-t border-[#E5E5E5] dark:border-[#222]">
          <nav className="px-4 py-3 flex flex-col">
            {navLinks.map(({ label, to }) => (
              <Link
                key={to}
                href={to}
                onClick={() => setOpen(false)}
                className={mobileNavClass(isLinkActive(to, pathname))}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="px-4 pb-4 pt-2 flex gap-5 border-t border-[#F5F5F5] dark:border-[#222]">
            {socialLinks.map(({ href, src, alt }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="opacity-50 hover:opacity-100 transition-opacity"
                aria-label={alt}
              >
                <Image src={src} alt={alt} width={20} height={20} className="dark:invert" />
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
