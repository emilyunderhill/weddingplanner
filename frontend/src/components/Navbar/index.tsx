import React from "react";
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const Navbar = () => {
  const noUserContent = (
    <div className="navbar-content">
      <a>Create account</a>
      <FontAwesomeIcon icon={solid("ribbon")} className="heading" />
        <div className="flex-row">
          <a>
            Log in
          </a>
          <FontAwesomeIcon icon={solid("chevron-down")} size="xs" className="link ml-sm" />
        </div>
    </div>

  )

  return (
    <div className="navbar-container">
      <div>
        {noUserContent}
      </div>
      <hr />
    </div>
  )
}

export default Navbar
