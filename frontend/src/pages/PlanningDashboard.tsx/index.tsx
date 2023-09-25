import React, { FC } from "react";
import Button from "../../components/Button";
import PageContainer from "../../components/PageContainer";
import useChecklist from "../../hooks/useChecklist";
import useUser from "../../hooks/useUser";

const PlanningDashboard: FC = () => {
  const {
    state: { isLoading, errors, data },
    actions: { getChecklist }
  } = useChecklist()

  const { state: { accessToken }} = useUser()

  return (
    <PageContainer>
      <Button
        action={() => getChecklist(accessToken ?? '').then(() => console.log(data))}
        content="Create checklist"
        variant="primary"
      />
    </PageContainer>
  )
}

export default PlanningDashboard
