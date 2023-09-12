import React, { useContext, useMemo } from 'react';
import { FC } from 'react'
import '../../style.scss'
import { CarouselItemType } from './CarouselItems'
import PageContext from '../../../../hooks/PageContext';

export type Position = 'primary' | 'secondary' | 'tertiary'

type Props = {
  item: CarouselItemType
  handleSelect: (id: number) => void
  scale: number
  translateX: number
  animate: boolean
}

const CarouselItem: FC<Props> = ({
  scale,
  translateX,
  item,
  handleSelect,
  animate
}) => {
  const { isMobile } = useContext(PageContext)()

  if (!item) {
    return null
  }
  return (
    <div
      className={`carousel-item-container ${animate ? 'carousel-animation': ''}`}
      style={{ minWidth: isMobile ? '100%' : '20%', transform: `translateX(${ translateX }%`}}
    >
      <div
        className="carousel-item" onClick={() => handleSelect(item.id)}
        style={{transform: `scale(${scale})`}}
      >
        <div className='carousel-item-image' style={{ backgroundImage: `url(${item.imageSrc})`}} />
        <div className="carousel-item-title">
          <p>{item.title}</p>
        </div>
      </div>
    </div>
  )
}

export default CarouselItem
