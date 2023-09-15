import React from "react";
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import useUser from "../../hooks/useUser";
import Button from "../Button";

const Navbar = () => {
  const {
    state: { isAuthenticated },
    actions: { logOut }
  } = useUser()

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
        <Button
          action={() => logOut()}
          content={
            (
              <div className="flew-row">
                <a>Log out</a>
                <FontAwesomeIcon icon={solid("chevron-down")} size="xs" className="link ml-sm" />
              </div>
            )
          } variant={"link"} />
      </div>
    </div>
  )

  return (
    <div className="navbar-container">
      {isAuthenticated ? userContent : noUserContent}
      <hr />
    </div>
  )
}

export default Navbar
