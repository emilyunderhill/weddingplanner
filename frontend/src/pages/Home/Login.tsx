import React, { useContext, useEffect, useState } from "react"
import Button from "../../components/Button"
import './style.scss'
import useUser from "../../hooks/useUser"
import Input from "../../components/Input"
import { ROUTE_DASHBOARD, ROUTE_REGISTER } from "../../library/routes"
import { useNavigate } from "react-router-dom"
import { ValidationError } from "../../redux/auth/types"
import heroImg from '../../assets/images/heroImage8.jpg'
import useIsMobile from "../../hooks/useIsMobile"

interface KeyboardEvent {
  key: string
}

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  const { isMobile } = useIsMobile()

  const [errorData, setErrorData] = useState<undefined | ValidationError>(undefined)

  const {
    actions: { login, resetErrors },
    state: { isLoading, errors, isAuthenticated }
  } = useUser()

  useEffect(() => {
    if (errors) {
      setErrorData(errors)
    }
  }, [errors])

  const handleOnLogin = () => {
    login({ email, password })
  }

  const handleOnKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleOnLogin()
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTE_DASHBOARD)
    }
  }, [isAuthenticated])

  return (
    <div className="hero-image" style={{ backgroundImage: `url(${heroImg})` }}>
      <div className="hero-image-text-container" style={{ maxWidth: isMobile ? '100%' : '33%' }}>
        <h1>
          Login to your account
        </h1>
        <div className="grid-2" onKeyDown={handleOnKeyDown}>
          <div className="pr-sm">
            <Input
              name="email"
              label="Email"
              labelPosition="top"
              value={email}
              onChange={(value) => setEmail(value as string)}
              errors={errorData}
            />
          </div>
          <div className="pl-sm">
            <Input
              name="password"
              label="Password"
              labelPosition="top"
              value={password}
              onChange={(value) => setPassword(value as string)} type="password"
              errors={errorData}
            />
          </div>
        </div>
        <div style={{
          marginTop: '5%',
          display: 'flex',
          alignItems: 'center',
        }}>
          <Button
            action={() => navigate(ROUTE_REGISTER)}
            content="Create a new account"
            variant="link"
          />
          <div className="ml-auto">
            <Button
              action={() => login({ email, password })}
              content="Login"
              variant="primary"
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
