import React, { FC, useEffect, useState } from "react";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import useUser from "../../../../hooks/useUser";
import { ValidationError } from "../../../../redux/auth/types";


type Props = {
  isOpen: boolean
  onClose: () => void
}

const CreateAccountModal: FC<Props> = ({ isOpen, onClose }) => {
  //Main user details
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errorData, setErrorData] = useState<undefined | ValidationError>(undefined)

  const {
    actions: { register },
    state: { isLoading, errors }
  } = useUser()

  useEffect(() => {
    if (errors) {
      setErrorData(errors)
    }
  }, [errors])

  const handleOnClose = () => {
    setErrorData(undefined)
    setPassword('')
    onClose()
  }

  const content = (
    <div>
      <h2 className="heading">
        Your details
      </h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        padding: 0,
      }}>
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
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr"
      }}>
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
        action={() => register({ firstName, lastName, email, password })}
        content="Register"
        variant="primary"
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
