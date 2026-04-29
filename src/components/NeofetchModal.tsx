'use client'

import { useEffect, useRef } from 'react'
import { useFocusTrap } from '@/lib/use-focus-trap'

const ASCII = [
  ' _____  _   _ ',
  '|  __ \\| \\ | |',
  '| |  | |  \\| |',
  '| |  | | . ` |',
  '| |__| | |\\  |',
  '|_____/|_| \\_|',
]

const INFO: [string, string][] = [
  ['Name',      'Daneil Nguyen'],
  ['Role',      'Software Engineer'],
  ['Location',  'San Jose, CA'],
  ['OS',        'macOS Sequoia'],
  ['Shell',     'zsh'],
  ['Editor',    'VS Code / Cursor'],
  ['Languages', 'TypeScript · Python · Go · Java'],
  ['Countries', '10+ visited'],
  ['Camera',    'Sony A7C II'],
  ['Hobbies',   'Photography · Traveling · Coffee'],
  ['Coffee',    '▓▓▓▓▓▓▓▓░░  80%'],
  ['Sleep',     '▓▓▓▓░░░░░░  40%'],
  ['Fun Fact',  'I can solve a Rubik\'s cube'],
]

const SWATCHES = [
  '#1a1a1a', '#C2410C', '#737373', '#f5f5f5',
  '#2a2a2a', '#EA580C', '#a3a3a3', '#ffffff',
]

interface NeofetchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function NeofetchModal({ isOpen, onClose }: NeofetchModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  useFocusTrap(panelRef, isOpen)

  useEffect(() => {
    if (!isOpen) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  // Move focus into the panel when it opens
  useEffect(() => {
    if (isOpen) requestAnimationFrame(() => panelRef.current?.focus())
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center px-4"
      onMouseDown={onClose}
    >
      <div className="absolute inset-0 bg-black/20 dark:bg-black/60 backdrop-blur-sm" />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="neofetch-title"
        tabIndex={-1}
        className="relative w-full max-w-[600px] rounded-xl overflow-hidden shadow-2xl border border-[#E5E5E5] dark:border-[#2a2a2a] bg-white dark:bg-[#0d0d0d] animate-[palette-in_0.15s_ease-out] outline-none"
        style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }}
        onMouseDown={e => e.stopPropagation()}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#F0F0F0] dark:border-[#1e1e1e]">
          <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#FF5F57] hover:brightness-90 transition-[filter]" aria-label="Close" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" aria-hidden="true" />
          <div className="w-3 h-3 rounded-full bg-[#28CA41]" aria-hidden="true" />
          <span id="neofetch-title" className="ml-auto text-xs text-[#999] dark:text-[#555] select-none">daneil@portfolio — neofetch</span>
        </div>

        {/* Body */}
        <div className="p-6 flex gap-8 items-start">
          {/* ASCII art */}
          <div className="shrink-0 select-none" aria-hidden="true">
            {ASCII.map((line, i) => (
              <div key={i} className="text-[#C2410C] text-sm leading-snug whitespace-pre">{line}</div>
            ))}
            {/* Color swatches */}
            <div className="flex gap-1 mt-4">
              {SWATCHES.map(color => (
                <div key={color} className="w-4 h-4 rounded-sm" style={{ background: color }} />
              ))}
            </div>
          </div>

          {/* Info table */}
          <div className="flex-1 min-w-0">
            <div className="text-[#C2410C] text-sm font-bold mb-1" aria-hidden="true">
              daneil
              <span className="text-[#999] dark:text-[#555]">@</span>
              <span className="text-[#111111] dark:text-[#f5f5f5]">portfolio</span>
            </div>
            <div className="border-t border-[#E5E5E5] dark:border-[#2a2a2a] mb-3" />
            <dl className="space-y-1">
              {INFO.map(([key, value]) => (
                <div key={key} className="flex text-xs leading-5">
                  <dt className="text-[#C2410C] font-semibold w-24 shrink-0">{key}</dt>
                  <span className="text-[#999] dark:text-[#555] mr-2" aria-hidden="true">:</span>
                  <dd className="text-[#333333] dark:text-[#d4d4d4]">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
