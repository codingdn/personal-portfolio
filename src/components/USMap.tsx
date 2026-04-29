'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { geoAlbersUsa, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import type { FeatureCollection, Polygon, MultiPolygon } from 'geojson'
import type { StatePhotos } from '@/types'
import { useTheme } from '@/contexts/ThemeContext'

type StatesTopology = Topology<{ states: GeometryCollection<{ name: string }> }>

interface StateShape {
  name: string
  path: string
}

interface USMapProps {
  statePhotos: StatePhotos[]
  selectedState: StatePhotos | null
  onStateSelect: (state: StatePhotos | null) => void
}

const VIEW_W = 975
const VIEW_H = 610

export default function USMap({ statePhotos, selectedState, onStateSelect }: USMapProps) {
  const [shapes, setShapes] = useState<StateShape[]>([])
  const [loadError, setLoadError] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    fetch('/states-10m.json')
      .then(res => res.json())
      .then((topology: StatesTopology) => {
        const fc = feature(topology, topology.objects.states) as FeatureCollection<Polygon | MultiPolygon, { name: string }>
        const projection = geoAlbersUsa().fitSize([VIEW_W, VIEW_H], fc)
        const pathGen = geoPath(projection)
        setShapes(
          fc.features.map(f => ({
            name: f.properties?.name ?? '',
            path: pathGen(f) ?? '',
          }))
        )
      })
      .catch(() => setLoadError(true))
  }, [])

  const visitedNames = useMemo(
    () => new Set(statePhotos.map(s => s.stateName)),
    [statePhotos]
  )

  const handleStateClick = useCallback((name: string) => {
    const found = statePhotos.find(s => s.stateName === name) ?? null
    onStateSelect(selectedState?.stateName === name ? null : found)
  }, [statePhotos, onStateSelect, selectedState])

  const selectedName = selectedState?.stateName ?? null
  const strokeColor = theme === 'dark' ? '#111111' : '#ffffff'
  const defaultFill = theme === 'dark' ? '#2a2a2a' : '#D4D4D4'

  if (loadError) {
    return (
      <div className="w-full aspect-[975/610] flex items-center justify-center border border-dashed border-[#E5E5E5] dark:border-[#2a2a2a] rounded-xl">
        <p className="text-sm text-[#737373] dark:text-[#a3a3a3]">Map failed to load.</p>
      </div>
    )
  }

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className="w-full h-auto"
      aria-label="Map of the United States"
      role="group"
    >
      {shapes.map(({ name, path }) => {
        if (!path) return null
        const isVisited = visitedNames.has(name)
        const isSelected = name === selectedName

        return (
          <path
            key={name}
            d={path}
            fill={isSelected ? '#C2410C' : isVisited ? 'rgba(194,65,12,0.65)' : defaultFill}
            stroke={strokeColor}
            strokeWidth={0.5}
            style={{ cursor: isVisited ? 'pointer' : 'default', transition: 'fill 0.15s' }}
            role={isVisited ? 'button' : undefined}
            aria-label={isVisited ? name : undefined}
            aria-pressed={isVisited ? isSelected : undefined}
            tabIndex={isVisited ? 0 : undefined}
            onClick={() => { if (isVisited) handleStateClick(name) }}
            onKeyDown={isVisited ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleStateClick(name)
              }
            } : undefined}
          >
            <title>{name}</title>
          </path>
        )
      })}
    </svg>
  )
}
