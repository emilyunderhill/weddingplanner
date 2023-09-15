import React from "react";
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

const Navbar = () => {
  const isAuthenticated = () => {
    const rawStorage = window.localStorage.getItem('persist:user')

    if (!rawStorage) {
      console.log('Err: auth local storage not found')
      return
    }

    const auth = JSON.parse(rawStorage).auth


    return JSON.parse(auth).isAuthenticated
  }

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

  const userContent = (
    <div className="navbar-content">
      <a>Home</a>
      <FontAwesomeIcon icon={solid("ribbon")} className="heading" />
      <div className="flex-row">
        <a>
          Log out
        </a>
        <FontAwesomeIcon icon={solid("chevron-down")} size="xs" className="link ml-sm" />
      </div>
    </div>
  )

  return (
    <div className="navbar-container">
      {isAuthenticated() ? userContent : noUserContent}
      <hr />
    </div>
  )
}

export default Navbar
