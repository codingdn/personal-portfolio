import Image from 'next/image'

const socialLinks = [
  { href: 'https://www.linkedin.com/in/daneil-nguyen/', src: '/assets/linkedin.svg', alt: 'LinkedIn' },
  { href: 'https://github.com/codingdn', src: '/assets/github.svg', alt: 'GitHub' },
  { href: 'https://www.instagram.com/badpicsinc/', src: '/assets/instagram.svg', alt: 'Instagram' },
  { href: 'mailto:danthedevnguyen@gmail.com', src: '/assets/mail.svg', alt: 'Email' },
]

export default function Footer() {
  return (
    <footer className="border-t border-[#E5E5E5] dark:border-[#222] px-4 py-8">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-[#737373] dark:text-[#a3a3a3]">© 2026 Daneil Nguyen</p>
        <div className="flex items-center gap-5">
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
      </div>
    </footer>
  )
}
