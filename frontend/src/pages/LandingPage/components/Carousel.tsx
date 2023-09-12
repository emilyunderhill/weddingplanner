import React, { useEffect } from 'react';
import '../style.scss'
import '../../../assets/images/guestlist.jpg'
import { useState } from 'react'
import CarouselItem, { Position } from './CarouselItem'
import guestList from '../../../assets/images/guestlist.jpg'
import venue from '../../../assets/images/venue.jpg'
import budget from '../../../assets/images/budget.jpg'
import calendar from '../../../assets/images/calendar.jpg'
import invite from '../../../assets/images/invite.jpg'
import directions from '../../../assets/images/directions.jpg'
import personal from '../../../assets/images/personal.jpg'

export type CarouselItemType = {
  id: number
  imageSrc: string
  title: string
}

const items: CarouselItemType[] = [
  {
    id: 1,
    imageSrc: guestList,
    title: 'Organise your guestlists'
  },
  {
    id: 2,
    imageSrc: venue,
    title: 'Find your perfect venue'
  },
  {
    id: 3,
    imageSrc: budget,
    title: 'Easily track your budget'
  },
  {
    id: 4,
    imageSrc: calendar,
    title: 'Take the stress out of planning multiple events'
  },
  {
    id: 5,
    imageSrc: invite,
    title: 'Design your own invites'
  },
  {
    id: 6,
    imageSrc: personal,
    title: 'Keep it personal'
  }
]

const Carousel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)

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

  return (
    <div className="carousel-wrapper">
      <div className="carousel-grid">
        {items.map((item, index) => {
          const distanceFromCenter = Math.abs(selectedIndex - index)
          return (
            <CarouselItem
              item={item}
              handleSelect={handleSelectSlide}
              distanceFromCenter={distanceFromCenter}
              key={item.id}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Carousel
