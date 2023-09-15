import React, { useState } from "react";
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import useUser from "../../hooks/useUser";
import Button from "../Button";
import LoginModal from "../LoginModal";

const Navbar = () => {
  const {
    state: { isAuthenticated },
    actions: { logOut }
  } = useUser()

  const [loginModalOpen, setLoginModalOpen] = useState(false)

  const handleOnLogin = () => {
    setLoginModalOpen(true)
  }

  const noUserContent = (
    <div className="navbar-content">
      <a>Create account</a>
      <FontAwesomeIcon icon={solid("ribbon")} className="heading" />
      <Button
        action={() => handleOnLogin()}
        content={
          (
            <div className="flew-row">
              <a>Log in</a>
              <FontAwesomeIcon icon={solid("chevron-down")} size="xs" className="link ml-sm" />
            </div>
          )
        }
        variant={"link"}
      />
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
              </div>
            )
            }
          variant={"link"}
        />
      </div>
    </div>
  )

  return (
    <>
      <div className="navbar-container">
        {isAuthenticated ? userContent : noUserContent}
        <hr />
      </div>
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </>
  )
}

export default Navbar
