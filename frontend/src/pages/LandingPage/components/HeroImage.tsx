import React, { useContext, useState } from "react"
import useIsMobile from "../../../hooks/useIsMobile"
import heroImg from '../../../assets/images/hero-image-6.jpg'
import Button from "../../../components/Button"
import CreateAccountModal from "./CreateAccountModal"

const HeroImage = () => {
  const { isMobile } = useIsMobile()
  const [createOpen, setCreateOpen] = useState(false)

  return (
    <div style={{
      position: 'relative',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundImage: `url(${heroImg})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      display: 'flex',
    }}>
      <div style={{
        marginTop: '10%',
        marginLeft: '10%',
        marginRight: '10%',
        maxWidth: isMobile ? '100%' : '33%',
      }}>
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
          <a style={{
            marginLeft: 'auto',
            paddingLeft: '10px',
          }}>
            {isMobile ? 'Log in' : 'Log in to an existing account'}
          </a>
        </div>
      </div>
      <CreateAccountModal isOpen={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  )
}

export default HeroImage
