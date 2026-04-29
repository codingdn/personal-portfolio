import type { Metadata } from 'next'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { CommandPaletteProvider } from '@/components/CommandPalette'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Daneil Nguyen',
  description: 'Software Engineer. Photographer. Traveler.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Set dark class before React hydrates to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(s==='dark'||(!s&&d))document.documentElement.classList.add('dark')})()`,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <CommandPaletteProvider>
            <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#111111] flex flex-col">
              <Nav />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </CommandPaletteProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
