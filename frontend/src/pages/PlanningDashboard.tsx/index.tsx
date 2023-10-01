import React, { FC, useState } from "react";
import Button from "../../components/Button";
import PageContainer from "../../components/PageContainer";
import useUser from "../../hooks/useUser";
import { useCreateChecklistItemMutation, useGetChecklistQuery } from "../../redux/checklist/checklistApi";
import Input from "../../components/Input";
import ProgressCircle from "../../components/ProgressCircle";
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
