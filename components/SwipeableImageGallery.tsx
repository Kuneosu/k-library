"use client"

import { useState, useRef } from 'react'
import { motion, PanInfo } from 'framer-motion'
import NextImage from 'next/image'

interface SwipeableImageGalleryProps {
  images: string[]
  projectName: string
  onImageClick: (index: number) => void
}

export default function SwipeableImageGallery({ images, projectName, onImageClick }: SwipeableImageGalleryProps) {
  const [dragOffset, setDragOffset] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleDragStart = () => {
    isDragging.current = true
  }

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!containerRef.current) return
    
    // Natural scroll based on drag distance
    const scrollAmount = -info.offset.x * 0.8 // Adjust multiplier for scroll sensitivity
    containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    
    setDragOffset(0)
    setTimeout(() => {
      isDragging.current = false
    }, 100)
  }

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setDragOffset(info.offset.x)
  }

  const handleImageClick = (index: number, event: React.MouseEvent) => {
    event.preventDefault()
    if (!isDragging.current) {
      onImageClick(index)
    }
  }

  if (images.length === 0) return null

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">스크린샷</h3>
      <div className="relative">
        <motion.div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          style={{
            x: dragOffset * 0.5, // Reduce drag sensitivity for better feel
          }}
        >
          {images.map((screenshot, index) => (
            <motion.button
              key={index}
              onClick={(e) => handleImageClick(index, e)}
              className="relative flex-shrink-0 rounded-xl overflow-hidden bg-muted shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
              whileHover={{ scale: isDragging.current ? 1 : 1.02 }}
              whileTap={{ scale: isDragging.current ? 1 : 0.98 }}
              style={{
                pointerEvents: isDragging.current ? 'none' : 'auto',
              }}
            >
              <NextImage
                src={screenshot}
                alt={`${projectName} 스크린샷 ${index + 1}`}
                width={500}
                height={400}
                className="object-contain max-h-80 w-auto group-hover:brightness-110 transition-all duration-300"
                sizes="500px"
                priority={index === 0}
                draggable={false} // Prevent image dragging
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-gray-900 px-3 py-2 rounded-lg text-sm font-medium">
                  클릭하여 확대
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  )
}