import React, { FC, useState } from "react";
import Button from "../../components/Button";
import PageContainer from "../../components/PageContainer";
import useUser from "../../hooks/useUser";
import { useCreateChecklistItemMutation, useGetChecklistQuery } from "../../redux/checklist/checklistApi";
import Input from "../../components/Input";

const PlanningDashboard: FC = () => {
  const {data, isLoading, error} = useGetChecklistQuery()

  console.log({data})

  const [createChecklistItem, { isLoading: isCreateLoading, error: isCreateError}] = useCreateChecklistItemMutation()

  const [title, setTitle] = useState('')

  return (
    <PageContainer>
      <Input labelPosition="top" label="title" value={title} name="title" onChange={(val) => setTitle(val as string)} />
      <Button
        action={() => createChecklistItem({ title })}
        content="Create checklist itme"
        variant="primary"
      />
    </PageContainer>
  )
}

export default PlanningDashboard
