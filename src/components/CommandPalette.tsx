'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/contexts/ThemeContext'
import { useFocusTrap } from '@/lib/use-focus-trap'
import NeofetchModal from '@/components/NeofetchModal'
import LuckyModal from '@/components/LuckyModal'

// ─── Icons ────────────────────────────────────────────────────────────────────

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  )
}
function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}
function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
    </svg>
  )
}
function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  )
}
function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    </svg>
  )
}
function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
    </svg>
  )
}
function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  )
}
function TerminalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>
    </svg>
  )
}
function DiceIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
      <path d="M16 8h.01M8 8h.01M8 16h.01M16 16h.01M12 12h.01"/>
    </svg>
  )
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface PaletteContextValue {
  open: () => void
}

const PaletteContext = createContext<PaletteContextValue>({ open: () => {} })

export function useCommandPalette() {
  return useContext(PaletteContext)
}

// ─── Commands ─────────────────────────────────────────────────────────────────

interface Command {
  id: string
  label: string
  group: string
  icon: ReactNode
  action: () => void
}

function useCommands(onNeofetch: () => void, onLucky: () => void): Command[] {
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()

  return useMemo<Command[]>(() => [
    {
      id: 'toggle-theme',
      label: theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode',
      group: 'Appearance',
      icon: theme === 'light' ? <MoonIcon /> : <SunIcon />,
      action: toggleTheme,
    },
    {
      id: 'nav-projects',
      label: 'Go to Projects',
      group: 'Navigation',
      icon: <ArrowRightIcon />,
      action: () => router.push('/projects'),
    },
    {
      id: 'nav-photography',
      label: 'Go to Photography',
      group: 'Navigation',
      icon: <ArrowRightIcon />,
      action: () => router.push('/photography'),
    },
    {
      id: 'email',
      label: 'Email Me',
      group: 'Links',
      icon: <MailIcon />,
      action: () => { window.location.href = 'mailto:danthedevnguyen@gmail.com' },
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      group: 'Links',
      icon: <ExternalLinkIcon />,
      action: () => window.open('https://www.linkedin.com/in/daneil-nguyen/', '_blank', 'noopener,noreferrer'),
    },
    {
      id: 'github',
      label: 'GitHub',
      group: 'Links',
      icon: <ExternalLinkIcon />,
      action: () => window.open('https://github.com/codingdn', '_blank', 'noopener,noreferrer'),
    },
    {
      id: 'instagram',
      label: 'Instagram',
      group: 'Links',
      icon: <ExternalLinkIcon />,
      action: () => window.open('https://www.instagram.com/badpicsinc/', '_blank', 'noopener,noreferrer'),
    },
    {
      id: 'resume',
      label: 'Download Resume',
      group: 'Links',
      icon: <DownloadIcon />,
      action: () => {
        const a = document.createElement('a')
        a.href = '/resume.pdf'
        a.download = 'daneil-nguyen-resume.pdf'
        a.click()
      },
    },
    {
      id: 'neofetch',
      label: 'neofetch',
      group: 'Fun',
      icon: <TerminalIcon />,
      action: onNeofetch,
    },
    {
      id: 'lucky',
      label: "I'm Feeling Lucky",
      group: 'Fun',
      icon: <DiceIcon />,
      action: onLucky,
    },
  ], [theme, toggleTheme, router, onNeofetch, onLucky])
}

// ─── Palette modal ────────────────────────────────────────────────────────────

interface PaletteProps {
  isOpen: boolean
  onClose: () => void
  onNeofetch: () => void
  onLucky: () => void
}

function Palette({ isOpen, onClose, onNeofetch, onLucky }: PaletteProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const commands = useCommands(onNeofetch, onLucky)

  useFocusTrap(panelRef, isOpen)

  const filtered = useMemo(() => {
    if (!query.trim()) return commands
    const q = query.toLowerCase()
    return commands.filter(c =>
      c.label.toLowerCase().includes(q) || c.group.toLowerCase().includes(q)
    )
  }, [commands, query])

  const grouped = useMemo(() => {
    const map = new Map<string, Command[]>()
    for (const cmd of filtered) {
      if (!map.has(cmd.group)) map.set(cmd.group, [])
      map.get(cmd.group)!.push(cmd)
    }
    return map
  }, [filtered])

  // Refs so the document keydown listener always reads current values
  // Updated after every render via useEffect (no deps = runs every render)
  const filteredRef = useRef(filtered)
  const selectedIndexRef = useRef(selectedIndex)
  useEffect(() => {
    filteredRef.current = filtered
    selectedIndexRef.current = selectedIndex
  })

  const run = useCallback((cmd: Command) => {
    cmd.action()
    onClose()
  }, [onClose])

  // Reset state and focus input whenever palette opens
  useEffect(() => {
    if (!isOpen) return
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery('')
    setSelectedIndex(0)
    requestAnimationFrame(() => inputRef.current?.focus())
  }, [isOpen])

  // Reset selection to top when search query changes
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setSelectedIndex(0) }, [query])

  // Scroll highlighted item into view
  useEffect(() => {
    const item = listRef.current?.querySelector('[data-selected="true"]') as HTMLElement | null
    item?.scrollIntoView({ block: 'nearest' })
  }, [selectedIndex])

  // Document-level keyboard handler — reliable regardless of focus state
  useEffect(() => {
    if (!isOpen) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(i => Math.min(i + 1, filteredRef.current.length - 1))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(i => Math.max(i - 1, 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        const cmd = filteredRef.current[selectedIndexRef.current]
        if (cmd) run(cmd)
      } else if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, run, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[18vh] px-4"
      onMouseDown={onClose}
    >
      <div className="palette-backdrop absolute inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="palette-title"
        className="palette-panel relative w-full max-w-[480px] bg-white dark:bg-[#1a1a1a] border border-[#E5E5E5] dark:border-[#2a2a2a] rounded-xl shadow-2xl overflow-hidden"
        onMouseDown={e => e.stopPropagation()}
      >
        <span id="palette-title" className="sr-only">Command Palette</span>

        {/* Search */}
        <div className="flex items-center gap-3 px-4 h-12 border-b border-[#F0F0F0] dark:border-[#252525]">
          <span className="text-[#C0C0C0] dark:text-[#555] shrink-0" aria-hidden="true"><SearchIcon /></span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search commands..."
            aria-label="Search commands"
            aria-autocomplete="list"
            className="flex-1 text-sm text-[#111111] dark:text-[#f5f5f5] bg-transparent outline-none placeholder:text-[#C0C0C0] dark:placeholder:text-[#444]"
          />
          <kbd className="shrink-0 text-[11px] text-[#C0C0C0] dark:text-[#444] font-mono bg-[#F5F5F5] dark:bg-[#222] border border-[#E5E5E5] dark:border-[#333] px-1.5 py-0.5 rounded">
            esc
          </kbd>
        </div>

        {/* List */}
        <div ref={listRef} className="max-h-80 overflow-y-auto py-1" role="listbox" aria-label="Commands">
          {filtered.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-[#C0C0C0] dark:text-[#444]">
              No commands found.
            </p>
          ) : (
            Array.from(grouped.entries()).map(([group, cmds]) => (
              <div key={group} role="group" aria-label={group}>
                <div className="px-4 pt-3 pb-1 text-[11px] font-medium text-[#C0C0C0] dark:text-[#444] uppercase tracking-wider select-none" aria-hidden="true">
                  {group}
                </div>
                {cmds.map(cmd => {
                  const idx = filtered.indexOf(cmd)
                  const isSelected = idx === selectedIndex
                  return (
                    <button
                      key={cmd.id}
                      role="option"
                      aria-selected={isSelected}
                      data-selected={isSelected}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      onClick={() => run(cmd)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-75 ${
                        isSelected
                          ? 'bg-[#F5F5F5] dark:bg-[#252525]'
                          : 'hover:bg-[#FAFAFA] dark:hover:bg-[#222]'
                      }`}
                    >
                      <span className={`shrink-0 transition-colors ${isSelected ? 'text-[#C2410C]' : 'text-[#C0C0C0] dark:text-[#555]'}`} aria-hidden="true">
                        {cmd.icon}
                      </span>
                      <span className={`text-sm transition-colors ${isSelected ? 'text-[#111111] dark:text-[#f5f5f5] font-medium' : 'text-[#737373] dark:text-[#a3a3a3]'}`}>
                        {cmd.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#F0F0F0] dark:border-[#252525] px-4 py-2 flex items-center gap-4 text-[11px] text-[#C0C0C0] dark:text-[#444] select-none" aria-hidden="true">
          <span><kbd className="font-mono">↑↓</kbd> navigate</span>
          <span><kbd className="font-mono">↵</kbd> select</span>
          <span className="ml-auto flex items-center gap-1">
            <kbd className="font-mono bg-[#F5F5F5] dark:bg-[#222] border border-[#E5E5E5] dark:border-[#333] px-1.5 py-0.5 rounded">⌘K</kbd>
          </span>
        </div>
      </div>
    </div>
  )
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isNeofetchOpen, setIsNeofetchOpen] = useState(false)
  const [isLuckyOpen, setIsLuckyOpen] = useState(false)

  // Tracks the element that had focus before any modal opened, so we can restore it on close
  const triggerRef = useRef<HTMLElement | null>(null)
  // Prevents focus restoration when closing palette to open a sub-modal
  const transitioningToSubModal = useRef(false)

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(prev => {
          if (!prev) triggerRef.current = document.activeElement as HTMLElement
          return !prev
        })
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const open = useCallback(() => {
    triggerRef.current = document.activeElement as HTMLElement
    setIsOpen(true)
  }, [])

  const handlePaletteClose = useCallback(() => {
    setIsOpen(false)
    if (!transitioningToSubModal.current) {
      requestAnimationFrame(() => triggerRef.current?.focus())
    }
    transitioningToSubModal.current = false
  }, [])

  const openNeofetch = useCallback(() => {
    transitioningToSubModal.current = true
    setIsOpen(false)
    setIsNeofetchOpen(true)
  }, [])

  const openLucky = useCallback(() => {
    transitioningToSubModal.current = true
    setIsOpen(false)
    setIsLuckyOpen(true)
  }, [])

  const handleNeofetchClose = useCallback(() => {
    setIsNeofetchOpen(false)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }, [])

  const handleLuckyClose = useCallback(() => {
    setIsLuckyOpen(false)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }, [])

  return (
    <PaletteContext.Provider value={{ open }}>
      {children}
      <Palette isOpen={isOpen} onClose={handlePaletteClose} onNeofetch={openNeofetch} onLucky={openLucky} />
      <NeofetchModal isOpen={isNeofetchOpen} onClose={handleNeofetchClose} />
      <LuckyModal isOpen={isLuckyOpen} onClose={handleLuckyClose} />
    </PaletteContext.Provider>
  )
}
