import React from 'react';
import '../style.scss'
import '../../../assets/images/guestlist.jpg'
import { useState } from 'react'
import CarouselItem from './CarouselItem'
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
    imageSrc: directions,
    title: 'Make it simple for your guests'
  },
  {
    id: 7,
    imageSrc: personal,
    title: 'Keep it personal'
  }
]

const Carousel = () => {
  console.log('has loaded')
  const [selectedId, setSelectedId] = useState<number>(0)

  const selectedIndex = items.findIndex((item) => item.id === selectedId)

  const getItem = (position: number) => {
    const diffCenter = position - 3
    let index = selectedIndex - diffCenter

    if (index < 0) {
      index = 5 - (index * -1)
    }

    return items[index]
  }

  return (
    <div className="carousel-wrapper">
      <div className="carousel-grid">
          <CarouselItem item={getItem(1)} onClick={() => setSelectedId(getItem(1).id)} position={'outside'} />
          <CarouselItem item={getItem(2)} onClick={() => setSelectedId(getItem(2).id)} position={'secondary'} />
          <CarouselItem item={getItem(3)} onClick={() => setSelectedId(getItem(3).id)} position={'center'} />
          <CarouselItem item={getItem(4)} onClick={() => setSelectedId(getItem(4).id)} position={'secondary'} />
          <CarouselItem item={getItem(5)} onClick={() => setSelectedId(getItem(5).id)} position={'outside'} />
      </div>

    </div>
  )
}

export default Carousel
