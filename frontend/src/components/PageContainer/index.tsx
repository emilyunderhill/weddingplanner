import React, { FC, ReactNode, useContext } from "react"
import useIsMobile from "../../hooks/useIsMobile"
import './style.scss'

type Props = {
  children: ReactNode
}

const PageContainer: FC<Props> = ({children}) => {
  const { isMobile } = useIsMobile()

  return (
    <div className={`page-container ${isMobile ? 'mobile-page-container' : 'desktop-page-container'}`}>
      {children}
    </div>
  )
}

export default PageContainer
