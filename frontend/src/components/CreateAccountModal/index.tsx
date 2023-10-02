import React, { FC, useEffect, useState } from "react";
import Modal from "../Modal";
import Button from "../Button";
import Input from "../Input";
import useUser from "../../hooks/useUser";
import { ValidationError } from "../../redux/auth/types";
import { useNavigate } from "react-router-dom";
import { ROUTE_DASHBOARD } from "../../library/routes";


type Props = {
  isOpen: boolean
  onClose: () => void
}

const CreateAccountModal: FC<Props> = ({ isOpen, onClose }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errorData, setErrorData] = useState<undefined | ValidationError>(undefined)

  const navigate = useNavigate()

  const {
    actions: { register, resetErrors },
    state: { isLoading, errors, isAuthenticated }
  } = useUser()

  useEffect(() => {
    if (errors) {
      setErrorData(errors)
    }
  }, [errors])

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTE_DASHBOARD)
      handleOnClose()
    }
  }, [isAuthenticated])

  const handleOnClose = () => {
    resetErrors()
    setErrorData(undefined)
    setPassword('')
    onClose()
  }

  const handleOnRegister = () => {
    register({ firstName, lastName, email, password })
  }


  const handleOnKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleOnRegister()
    }
  }

  const content = (
    <div>
      <h2 className="heading mt-sm mb-2m">
        Your details
      </h2>
      <div className="grid-2" onKeyDown={handleOnRegister}>
        <div className="pr-sm">
          <Input
            name="first_name"
            label="First name"
            labelPosition="top"
            value={firstName}
            onChange={(value) => setFirstName(value as string)}
            errors={errorData}
          />
        </div>
        <div className="pl-sm">
          <Input
            name="last_name"
            label="Last name"
            labelPosition="top"
            value={lastName}
            onChange={(value) => setLastName(value as string)}
            errors={errorData}
          />
        </div>
      </div>
      <div className="grid-2">
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
    </div>
  )

  const footerComponents = [
    <div className="ml-auto" key="create-account" >
      <Button
        action={handleOnRegister}
        content="Register"
        variant="primary"
        isLoading={isLoading}
      />
    </div>
  ]

  return (
    <Modal
      header="Create an account"
      content={content}
      footerComponents={footerComponents}
      isOpen={isOpen}
      onClose={handleOnClose} />
  )
}

export default CreateAccountModal
