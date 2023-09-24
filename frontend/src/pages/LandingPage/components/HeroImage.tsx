import React, { useContext, useState } from "react"
import useIsMobile from "../../../hooks/useIsMobile"
import heroImg from '../../../assets/images/hero-image-6.jpg'
import Button from "../../../components/Button"
import CreateAccountModal from "../../../components/CreateAccountModal"
import LoginModal from "../../../components/LoginModal"
import '../style.scss'
import useUser from "../../../hooks/useUser"

const HeroImage = () => {
  const { isMobile } = useIsMobile()
  const [createOpen, setCreateOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)

  const {
    actions: { resetErrors },
  } = useUser()

  const handleOnCloseLoginModal = () => {
    resetErrors()
    setLoginOpen(false)
  }

  const handleOnCloseCreateModal = () => {
    resetErrors()
    setCreateOpen(false)
  }

  return (
    <div className="hero-image" style={{ backgroundImage: `url(${heroImg})` }}>
      <div className="hero-image-text-container" style={{ maxWidth: isMobile ? '100%': '33%' }}>
        <h1>
          Start planning your perfect wedding
        </h1>
        <p className="paragraph">
          Relax while we take you through every step of the planning process.
        </p>
        <p className="paragraph">
          We understand how important this day is to you and with our extensive
          list of suppliers and easy to use budget tracker we will ensure you
          keep on top of all the todos.
        </p>
        {!isMobile && (
          <p className="paragraph">
            Don&apos;t miss a step and take the stress out of planning your
            special day.
          </p>
        )}
        <div style={{
          marginTop: '5%',
          display: 'flex',
          alignItems: 'center',
        }}>
          <Button
            action={() => setCreateOpen(true)}
            content={isMobile ? 'Create' : 'Create wedding'}
            variant={"primary"}
          />
          <div className="ml-auto">
            <Button
              action={() => setLoginOpen(true)}
              content={isMobile ? 'Log in' : 'Log in to an existing account'}
              variant="link"
            />
          </div>
        </div>
      </div>
      <CreateAccountModal isOpen={createOpen} onClose={handleOnCloseCreateModal} />
      <LoginModal isOpen={loginOpen} onClose={handleOnCloseLoginModal} />
    </div>
  )
}

export default HeroImage
