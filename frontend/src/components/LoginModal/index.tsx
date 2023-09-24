import React, { FC, useEffect, useState } from "react";
import Modal from "../Modal";
import Button from "../Button";
import Input from "../Input";
import useUser from "../../hooks/useUser";
import { ValidationError } from "../../redux/auth/types";


type Props = {
  isOpen: boolean
  onClose: () => void
}

const LoginModal: FC<Props> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errorData, setErrorData] = useState<undefined | ValidationError>(undefined)

  const {
    actions: { login, resetErrors },
    state: { isLoading, errors }
  } = useUser()

  useEffect(() => {
    if (errors) {
      setErrorData(errors)
    }
  }, [errors])

  const handleOnClose = () => {
    resetErrors()
    setErrorData(undefined)
    setPassword('')
    onClose()
  }

  const content = (
    <div>
      <h2 className="heading mt-sm mb-2m">
        Your details
      </h2>
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
        action={() => login({ email, password })}
        content="Login"
        variant="primary"
        isLoading={isLoading}
      />
    </div>
  ]

  return (
    <Modal
      header="Login to your account"
      content={content}
      footerComponents={footerComponents}
      isOpen={isOpen}
      onClose={handleOnClose} />
  )
}

export default LoginModal
