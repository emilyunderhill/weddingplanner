import React from 'react';
import { FC } from 'react'
import '../style.scss'
import { CarouselItemType } from './Carousel'

type Props = {
  item: CarouselItemType
  onClick: (id: number) => void
  position: 'center' | 'outside' | 'secondary'
}

const CarouselItem: FC<Props> = ({
  position,
  item,
  onClick,
}) => {
  console.log({ item })

  if (!item) {
    return null
  }

  return (
    <div className={`carousel-item carousel-item-${position}`} onClick={() => onClick(item.id)}>
      <div className='carousel-item-image' style={{ backgroundImage: `url(${item.imageSrc})`}} />
      <div className="carousel-item-title">
        <p>{item.title}</p>
      </div>
    </div>
  )
}

export default CarouselItem
