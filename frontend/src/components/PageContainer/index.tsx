import React, { FC, ReactNode, useContext } from "react"
import PageContext from "../../hooks/PageContext"
import './style.scss'

type Props = {
  children: ReactNode
}

const PageContainer: FC<Props> = ({children}) => {
  const { isMobile } = useContext(PageContext)()

  return (
    <div className={isMobile ? 'mobile-page-container' : 'desktop-page-container'}>
      {children}
    </div>
  )
}

export default PageContainer
