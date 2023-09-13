import React, { FC, useState } from "react";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import { login } from '../../../../actions/auth'
import { useAppDispatch } from "../../../../store";


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

  //Additional user details
  const [hasSecondUser, setHasSecondUser] = useState(false)
  const [secondUserFirstName, setSecondUserFirstName] = useState('')
  const [secondUserLastName, setSecondUserLastName] = useState('')
  const [secondUserEmail, setSecondUserEmail] = useState('')

  const dispatch = useAppDispatch()

  const handleRemoveSecondUser = () => {
    setHasSecondUser(false)
    setSecondUserFirstName('')
    setSecondUserLastName('')
    setSecondUserEmail('')
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
          <Input label="First name" labelPosition={"top"} value={firstName}
            onChange={(value) => setFirstName(value as string)} />
        </div>
        <div className="pl-sm">
          <Input label="Last name" labelPosition={"top"} value={lastName}
            onChange={(value) => setLastName(value as string)} />
        </div>
      </div>
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr"
      }}>
        <div className="pr-sm">
          <Input label="Email" labelPosition={"top"} value={email}
            onChange={(value) => setEmail(value as string)} />
        </div>
        <div className="pl-sm">
          <Input label="Password" labelPosition={"top"} value={password}
            onChange={(value) => setPassword(value as string)} type="password" />
        </div>
      </div>

      {hasSecondUser ? (
        <div>
          <h2 className="heading">
            Additional user details
          </h2>
          <p className="paragraph">
            We will send a welcome email to anyone you add, inviting them to create
            an account and contribute to your planning.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            padding: 0,
          }}>
            <div className="pr-sm">
              <Input label="First name" labelPosition={"top"} value={secondUserFirstName}
                onChange={(value) => setSecondUserFirstName(value as string)} />
            </div>
            <div className="pl-sm">
              <Input label="Last name" labelPosition={"top"} value={secondUserLastName}
                onChange={(value) => setSecondUserLastName(value as string)} />
            </div>
          </div>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "end"
          }}>
            <div className="pr-sm">
              <Input label="Email" labelPosition={"top"} value={secondUserEmail}
                onChange={(value) => setSecondUserEmail(value as string)} />
            </div>
            <div className="pl-sm">
              <Button action={handleRemoveSecondUser} content="Remove contributor" variant={"link-destructive"}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-sm">
          <Button action={() => setHasSecondUser(!hasSecondUser)} content="Add a contributor" variant="link" />
        </div>
      )}
    </div>
  )

  const footerComponents = [
    <div className="ml-auto" key="create-account" >
      <Button action={() => dispatch(login(email, password))} content={'Register'} variant={"primary"} />
    </div>
  ]

  return (
    <Modal
      header="Create an account"
      content={content}
      footerComponents={footerComponents}
      isOpen={isOpen}
      onClose={onClose} />
  )
}

export default CreateAccountModal
