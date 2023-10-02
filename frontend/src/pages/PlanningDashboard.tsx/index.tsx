import React, { FC } from "react";
import PageContainer from "../../components/PageContainer";
import useUser from "../../hooks/useUser";
import ChecklistDashboard from "./components/ChecklistDashboard";

const PlanningDashboard: FC = () => {
  const { state: user} = useUser()

  return (
    <PageContainer>
      <div>
        <h1>Hello {user?.firstName}!</h1>
      </div>
      <div className="grid-3">
        <ChecklistDashboard />
      </div>
    </PageContainer>
  )
}

export default PlanningDashboard
