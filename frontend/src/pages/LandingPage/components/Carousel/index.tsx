import React, { FC, useEffect } from 'react';
import '../../style.scss'
import { useState } from 'react'
import CarouselItem from './CarouselItem'
import items from './CarouselItems'


const Carousel: FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(3)

  useEffect(() => {
    setTimeout(() => {
      handleNextSlide()
    }, 3000)
  }, [selectedIndex])

  const handleNextSlide = () => {
    const nextIndex = selectedIndex === items.length - 1 ? 0 : selectedIndex + 1
    setSelectedIndex(nextIndex)
  }

  const handleSelectSlide = (id: number) => {
    const index = items.findIndex((item) => item.id === id)
    setSelectedIndex(index)
  }

  const getDistanceFromCenter = (index: number) => {
      const innerDiff = Math.abs(index - selectedIndex)
      const outerDiff = Math.abs(items.length - innerDiff)
      return Math.min(innerDiff, outerDiff)
  }

  return (
    <div className="carousel-wrapper">
      <div className="carousel-row">
        {items.map((item, index) => {
          //Shrink items that are not selected
          const scale = selectedIndex - index === 0 ? 1 : 0.6;
          //Move selected index to the center
          let translateX = (2-selectedIndex) * 100
          //Send item to end of list
          if (selectedIndex - index > 2) {
            translateX += 100*(items.length)
          }
          //Bring item to front of the list
          if (selectedIndex - index < -4) {
            translateX -= 100*(items.length)
          }
          //Only consecutive items are animated to stop animation when moving
          //from front to back of the list
          const distanceFromCenter = getDistanceFromCenter(index)
          console.log({index, selectedIndex, distanceFromCenter})
          const animate = Math.abs(distanceFromCenter) < 3

          return (
            <CarouselItem
              item={item}
              handleSelect={handleSelectSlide}
              scale={scale}
              key={item.id}
              translateX={translateX}
              animate={animate}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Carousel
