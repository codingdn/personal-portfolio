import Link from 'next/link'

export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl md:text-7xl font-medium text-[#111111] dark:text-[#f5f5f5] tracking-tight leading-tight">
        <span className="group relative inline-block" tabIndex={0}>
          <span className="underline decoration-[#C2410C] underline-offset-4 cursor-help" aria-describedby="name-tooltip">Daneil</span>
          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 z-10 pointer-events-none opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150 flex flex-col items-center">
            <span id="name-tooltip" role="tooltip" className="whitespace-nowrap bg-[#111111] dark:bg-[#f5f5f5] text-[#f5f5f5] dark:text-[#111111] text-xs font-normal px-3 py-1.5 rounded-lg shadow-lg tracking-normal">
              Don&apos;t worry, this is not a misspelling
            </span>
            <span aria-hidden="true" className="w-0 h-0 border-x-[5px] border-x-transparent border-t-[5px] border-t-[#111111] dark:border-t-[#f5f5f5]" />
          </span>
        </span>{' '}
        Nguyen
      </h1>
      <p className="mt-4 text-[#737373] dark:text-[#a3a3a3] text-base md:text-lg">
        Software Engineer. Photographer. Traveler.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
        <Link
          href="/projects"
          className="text-sm text-[#111111] dark:text-[#f5f5f5] hover:text-[#C2410C] dark:hover:text-[#C2410C] transition-colors duration-150"
        >
          View Projects →
        </Link>
        <Link
          href="/photography"
          className="text-sm text-[#737373] dark:text-[#a3a3a3] hover:text-[#C2410C] dark:hover:text-[#C2410C] transition-colors duration-150"
        >
          View Photos →
        </Link>
      </div>
    </section>
  )
}
