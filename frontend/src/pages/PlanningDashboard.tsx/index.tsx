import React, { FC } from "react";
import Button from "../../components/Button";
import PageContainer from "../../components/PageContainer";

const PlanningDashboard: FC = () => {
  return (
    <PageContainer>
      <Button
        action={() => null}
        content="Create checklist"
        variant="primary"
      />
    </PageContainer>
  )
}

export default PlanningDashboard
