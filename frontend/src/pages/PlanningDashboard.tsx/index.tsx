import React, { FC, useState } from "react";
import PageContainer from "../../components/PageContainer";
import useUser from "../../hooks/useUser";
import ChecklistDashboard from "./components/ChecklistDashboard";
import CreateChecklistItemModal from "./components/ChecklistDashboard/components/CreateChecklistItemModal";

const PlanningDashboard: FC = () => {
  const { state: user} = useUser()
  const [createChecklistItemModalOpen, setCreateChecklistItemModalOpen] = useState(false)


  return (
    <>
      <PageContainer transparentBackground={true}>
        <div>
          <h1>Hello {user?.firstName}!</h1>
        </div>
        <div className="grid-3">
          <ChecklistDashboard openCreateModal={() => setCreateChecklistItemModalOpen(true)} />
        </div>
      </PageContainer>
      <CreateChecklistItemModal isOpen={createChecklistItemModalOpen} onClose={() => setCreateChecklistItemModalOpen(false)} />
    </>

  )
}

export default PlanningDashboard
