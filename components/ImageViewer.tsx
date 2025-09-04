"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import NextImage from 'next/image'
import { useState, useEffect } from 'react'

interface ImageViewerProps {
  images: string[]
  initialIndex: number
  isOpen: boolean
  onClose: () => void
  projectName: string
}

export default function ImageViewer({ images, initialIndex, isOpen, onClose, projectName }: ImageViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex(prev => prev > 0 ? prev - 1 : images.length - 1)
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex(prev => prev < images.length - 1 ? prev + 1 : 0)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, images.length, onClose])

  const nextImage = () => {
    setCurrentIndex(prev => prev < images.length - 1 ? prev + 1 : 0)
  }

  const prevImage = () => {
    setCurrentIndex(prev => prev > 0 ? prev - 1 : images.length - 1)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[200] flex items-center justify-center"
        onClick={handleBackdropClick}
      >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="w-6 h-6" />
        </motion.button>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <motion.button
              onClick={prevImage}
              className="absolute left-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              onClick={nextImage}
              className="absolute right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </>
        )}

        {/* Image Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative max-w-[90vw] max-h-[90vh] mx-4"
        >
          <NextImage
            src={images[currentIndex]}
            alt={`${projectName} 스크린샷 ${currentIndex + 1}`}
            width={1200}
            height={900}
            className="object-contain max-w-[90vw] max-h-[90vh] w-auto h-auto"
            sizes="90vw"
            priority
            quality={95}
          />
        </motion.div>

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-black/50 text-white rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
            {images.map((image, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 relative w-16 h-12 rounded-lg overflow-hidden border-2 transition-colors ${
                  index === currentIndex 
                    ? 'border-white' 
                    : 'border-transparent hover:border-white/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <NextImage
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </motion.button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}