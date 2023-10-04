import React, { FC, useEffect, useState } from "react";
import Modal from "../../../../../components/Modal";
import { useCreateChecklistItemMutation } from "../../../../../redux/checklist/checklistApi";
import Input from "../../../../../components/Input";
import Toggle from "../../../../../components/Toggle";
import Button from "../../../../../components/Button";

type Props = {
  isOpen: boolean
  onClose: () => void
}

const CreateChecklistItemModal: FC<Props> = ({ isOpen, onClose }) => {
  const [createChecklistItem, { isSuccess, isLoading, error }] = useCreateChecklistItemMutation()
  const [title, setTitle] = useState('')
  const [isTopPriority, setIsTopPriority] = useState(false)
  const [errorData, setErrorData] = useState<Record<string, string> | undefined>(undefined)

  useEffect(() => {
    if (error && 'data' in error) {
      setErrorData(error.data as Record<string, string>)
    }
  }, [error])

  const handleOnClose = () => {
    setTitle('')
    setIsTopPriority(false)
    setErrorData(undefined)
    onClose()
  }

  useEffect(() => {
    if (isSuccess) {
      handleOnClose()
    }
  }, [isSuccess])

  const content = (
    <div className="grid-2">
      <div className="mr-sm">
        <Input
          name="title"
          label="Title"
          labelPosition="top"
          value={title}
          onChange={(value) => setTitle(value as string)}
          placeholder="Title"
          errors={errorData}
        />
      </div>
      <div className="mr-auto">
        <Toggle
          checked={isTopPriority}
          onChange={() => setIsTopPriority(!isTopPriority)}
          label="Push to top"
          labelPosition="top"
          name="isTopPriority"
        />
      </div>
    </div>
  )

  const footer = [
    (
      <Button
        action={() => createChecklistItem({
          title,
          topPriority: isTopPriority
        })}
        content="Add"
        variant="primary"
        key="submit"
        isLoading={isLoading}
      />
    )
  ]

  return (
    <Modal
      header="Add todo"
      content={content}
      footerComponents={footer}
      isOpen={isOpen}
      onClose={handleOnClose}
    />
  )
}

export default CreateChecklistItemModal
