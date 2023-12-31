import React, { useState } from "react";
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import useUser from "../../hooks/useUser";
import Button from "../Button";
import LoginModal from "../LoginModal";
import CreateAccountModal from "../CreateAccountModal";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ROUTE_DASHBOARD } from "../../library/routes";

const Navbar = () => {
  const {
    state: { isAuthenticated },
    actions: { logOut }
  } = useUser()

  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [createModalOpen, setCreateModalOpen] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const {
    actions: { resetErrors },
  } = useUser()

  const handleOnLogin = () => {
    setLoginModalOpen(true)
  }

  const handleOnLogout = () => {
    logOut()
    navigate('/')
  }

  const noUserContent = (
    <div className="navbar-content">
      <Button
        content="Start planning"
        action={() => setCreateModalOpen(true)}
        variant="link"
      />
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
      <Link to={ROUTE_DASHBOARD}>Home</Link>
      <FontAwesomeIcon icon={solid("ribbon")} className="heading" />
      <div className="flex-row">
        <Button
          action={handleOnLogout}
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

  const handleOnCloseLoginModal = () => {
    resetErrors()
    setLoginModalOpen(false)
  }

  const handleOnCloseCreateModal = () => {
    resetErrors()
    setCreateModalOpen(false)
  }


  return (
    <>
      <div className="navbar-container" style={{backgroundColor: location.pathname === '/' ? "transparent" : 'white'}}>
        {isAuthenticated ? userContent : noUserContent}
        <hr />
      </div>
      <LoginModal
        isOpen={loginModalOpen}
        onClose={handleOnCloseLoginModal}
      />
      <CreateAccountModal
        isOpen={createModalOpen}
        onClose={handleOnCloseCreateModal}
      />
    </>
  )
}

export default Navbar
