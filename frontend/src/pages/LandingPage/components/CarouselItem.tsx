import React from 'react';
import { FC } from 'react'
import '../style.scss'
import { CarouselItemType } from './Carousel'

export type Position = 'primary' | 'secondary' | 'tertiary'

type Props = {
  item: CarouselItemType
  handleSelect: (id: number) => void
  distanceFromCenter: number
}

const CarouselItem: FC<Props> = ({
  distanceFromCenter,
  item,
  handleSelect,
}) => {


  const scale = () =>{
    switch (distanceFromCenter) {
      case 0:
        return 1
      default:
        return 0.6;
  }}

  if (!item) {
    return null
  }

  return (
    <div
      className="carousel-item" onClick={() => handleSelect(item.id)}
      style={{transform: `scale(${scale()})`}}
    >
      <div className='carousel-item-image' style={{ backgroundImage: `url(${item.imageSrc})`}} />
      <div className="carousel-item-title">
        <p>{item.title}</p>
      </div>
    </div>
  )
}

export default CarouselItem
