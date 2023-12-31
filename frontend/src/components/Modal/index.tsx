import React, { FC, ReactNode, useRef } from "react";
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

type Props = {
  header: string
  content: ReactNode | string
  footerComponents: ReactNode[]
  isOpen: boolean
  onClose: () => void
}

const Modal: FC<Props> = ({isOpen, header, content, onClose, footerComponents}) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  if (!isOpen) {
    return null;
  }

  const handleOnClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      //Closes modal if user clicks outside
      if (event.target === wrapperRef.current){
        onClose()
      }
  }

  return (
    <div className="modal-wrapper" ref={wrapperRef} onClick={handleOnClick}>
      <div className="modal">
        <div className="modal-close" onClick={onClose}>
          <FontAwesomeIcon icon={solid("xmark")} />
        </div>
         <div className="modal-header">
          <h2>{header}</h2>
        </div>
        <hr />
        <div className="modal-content">
          {content}
        </div>
        <div className="modal-footer">
          {footerComponents}
        </div>
      </div>
    </div>
  )
}

export default Modal
