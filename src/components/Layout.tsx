import { Outlet } from 'react-router-dom'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { CommandPaletteProvider } from '@/components/CommandPalette'

export default function Layout() {
  return (
    <CommandPaletteProvider>
      <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#111111] flex flex-col">
        <Nav />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </CommandPaletteProvider>
  )
}
