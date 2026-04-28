import githubSvg from '@/assets/github.svg?url'
import linkedinSvg from '@/assets/linkedin.svg?url'
import instagramSvg from '@/assets/instagram.svg?url'
import mailSvg from '@/assets/mail.svg?url'

const socialLinks = [
  { href: 'https://www.linkedin.com/in/daneil-nguyen/', src: linkedinSvg, alt: 'LinkedIn' },
  { href: 'https://github.com/codingdn', src: githubSvg, alt: 'GitHub' },
  { href: 'https://www.instagram.com/badpicsinc/', src: instagramSvg, alt: 'Instagram' },
  { href: 'mailto:danthedevnguyen@gmail.com', src: mailSvg, alt: 'Email' },
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
              <img src={src} alt={alt} className="w-4 h-4 dark:invert" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
