import React from "react"
import useIsMobile from "../../hooks/useIsMobile"
import Button from "../../components/Button"
import { useNavigate } from "react-router-dom"
import { ROUTE_LOGIN, ROUTE_REGISTER } from "../../library/routes"
import heroImg from '../../assets/images/heroImage8.jpg'
import './style.scss'


const LandingPage = () => {
  const { isMobile } = useIsMobile()

  const navigate = useNavigate()

  return (
    <div className="hero-image" style={{ backgroundImage: `url(${heroImg})` }}>
      <div className="hero-image-text-container" style={{ maxWidth: isMobile ? '100%' : '33%' }}>
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
            action={() => navigate(ROUTE_REGISTER)}
            content={isMobile ? 'Create' : 'Create wedding'}
            variant={"primary"}
          />
          <div className="ml-auto">
            <Button
              action={() => navigate(ROUTE_LOGIN)}
              content={isMobile ? 'Log in' : 'Log in to an existing account'}
              variant="link"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
