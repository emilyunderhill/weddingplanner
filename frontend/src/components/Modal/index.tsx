import { FC, ReactNode, useRef } from "react";
import './style.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

type Props = {
  header: string
  content: ReactNode | string
  footer: ReactNode
  isOpen: boolean
  onClose: () => void
}

const Modal: FC<Props> = ({isOpen, header, content, onClose, footer}) => {
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
          <p>{header}</p>
        </div>
        <hr />
        <div className="modal-content">
          {content}
        </div>
        <div className="modal-footer">
          {footer}
        </div>
      </div>
    </div>
  )
}

export default Modal
