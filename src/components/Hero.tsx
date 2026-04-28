import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-56px)] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-5xl md:text-7xl font-medium text-[#111111] dark:text-[#f5f5f5] tracking-tight leading-tight">
        Daneil Nguyen
      </h1>
      <p className="mt-4 text-[#737373] dark:text-[#a3a3a3] text-base md:text-lg">
        Software Engineer. Photographer. Traveler.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
        <Link
          to="/projects"
          className="text-sm text-[#111111] dark:text-[#f5f5f5] hover:text-[#C2410C] dark:hover:text-[#C2410C] transition-colors duration-150"
        >
          View Projects →
        </Link>
        <Link
          to="/photography"
          className="text-sm text-[#737373] dark:text-[#a3a3a3] hover:text-[#C2410C] dark:hover:text-[#C2410C] transition-colors duration-150"
        >
          View Photos →
        </Link>
      </div>
    </section>
  )
}
