'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import Globe from 'react-globe.gl'
import { MeshPhongMaterial } from 'three'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import type { Feature, FeatureCollection, MultiPolygon } from 'geojson'
import type { CountryPhotos } from '@/types'

type CountryFeature = Feature<MultiPolygon, { name: string }>
type WorldTopology = Topology<{ countries: GeometryCollection<{ name: string }> }>

interface GlobeComponentProps {
  countryPhotos: CountryPhotos[]
  selectedCountry: CountryPhotos | null
  onCountrySelect: (country: CountryPhotos | null) => void
  flyToTarget?: { lat: number; lng: number } | null
}

const oceanMaterial = new MeshPhongMaterial({ color: '#C5D8E8', shininess: 5 })

export default function GlobeComponent({
  countryPhotos,
  selectedCountry,
  onCountrySelect,
  flyToTarget,
}: GlobeComponentProps) {
  const [countries, setCountries] = useState<CountryFeature[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [loadError, setLoadError] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const globeRef = useRef<any>(null)

  useEffect(() => {
    fetch('/countries-110m.json')
      .then(res => res.json())
      .then((topology: WorldTopology) => {
        const fc = feature(
          topology,
          topology.objects.countries
        ) as FeatureCollection<MultiPolygon, { name: string }>
        setCountries(fc.features)
      })
      .catch(() => setLoadError(true))
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver(entries => {
      const entry = entries[0]
      if (entry) {
        const { width, height } = entry.contentRect
        setDimensions({ width, height })
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!flyToTarget || !globeRef.current) return
    globeRef.current.pointOfView({ lat: flyToTarget.lat, lng: flyToTarget.lng, altitude: 1.8 }, 900)
  }, [flyToTarget])

  const visitedNames = useMemo(
    () => new Set(countryPhotos.map(c => c.countryName)),
    [countryPhotos]
  )

  const selectedName = selectedCountry?.countryName ?? null

  const polygonCapColor = useMemo(
    () =>
      (d: object): string => {
        const name = (d as CountryFeature).properties?.name ?? ''
        if (name === selectedName) return 'rgba(194,65,12,1)'
        if (visitedNames.has(name)) return 'rgba(194,65,12,0.7)'
        return 'rgba(0,0,0,0)'
      },
    [selectedName, visitedNames]
  )

  const polygonStrokeColor = useMemo(
    () =>
      (d: object): string => {
        const name = (d as CountryFeature).properties?.name ?? ''
        return visitedNames.has(name) ? 'rgba(255,255,255,0.7)' : 'rgba(70,100,130,0.55)'
      },
    [visitedNames]
  )

  const polygonLabel = useMemo(
    () =>
      (d: object): string => {
        const name = (d as CountryFeature).properties?.name ?? ''
        if (!visitedNames.has(name)) return ''
        return `<span style="font-size:12px;background:rgba(0,0,0,0.72);color:#fff;padding:3px 8px;border-radius:4px;font-family:Inter,sans-serif">${name}</span>`
      },
    [visitedNames]
  )

  const handlePolygonClick = useCallback((polygon: object) => {
    const name = (polygon as CountryFeature).properties?.name ?? ''
    if (!visitedNames.has(name)) return
    const found = countryPhotos.find(c => c.countryName === name) ?? null
    onCountrySelect(selectedCountry?.countryName === name ? null : found)
  }, [visitedNames, countryPhotos, onCountrySelect, selectedCountry])

  if (loadError) {
    return (
      <div className="w-full h-72 sm:h-80 md:h-96 lg:h-[500px] flex items-center justify-center border border-dashed border-[#E5E5E5] dark:border-[#2a2a2a] rounded-xl">
        <p className="text-sm text-[#737373] dark:text-[#a3a3a3]">Globe failed to load.</p>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="w-full h-72 sm:h-80 md:h-96 lg:h-[500px]">
      {dimensions.width > 0 && (
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl={null}
          globeMaterial={oceanMaterial}
          polygonsData={countries}
          polygonCapColor={polygonCapColor}
          polygonSideColor={() => 'transparent'}
          polygonStrokeColor={polygonStrokeColor}
          polygonAltitude={0.01}
          polygonLabel={polygonLabel}
          onPolygonClick={handlePolygonClick}
        />
      )}
    </div>
  )
}
