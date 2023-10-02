import React, { ReactNode, useContext, useMemo } from 'react';
import { FC } from 'react'
import '../style.scss'
import useIsMobile from '../../../hooks/useIsMobile';

export type Position = 'primary' | 'secondary' | 'tertiary'

type Props = {
  item: ReactNode
  scale: number
  translateX: number
  animate: boolean
}

const CarouselItem: FC<Props> = ({
  scale,
  translateX,
  item,
  animate
}) => {
  const { isMobile } = useIsMobile()

  if (!item) {
    return null
  }
  return (
    <div
      className={`carousel-item-container ${animate ? 'carousel-animation': ''}`}
      style={{ minWidth: isMobile ? '100%' : '20%', transform: `translateX(${ translateX }%`}}
    >
      <div
        className="carousel-item"
        style={{transform: `scale(${scale})`}}
      >
        {item}
      </div>
    </div>
  )
}

export default CarouselItem
