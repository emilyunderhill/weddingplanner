import React from "react"
import Button from "../../../../components/Button"
import ProgressCircle from "../../../../components/ProgressCircle"
import { useGetChecklistDashboardQuery } from "../../../../redux/dashboard/checklistDashboardApi"

const ChecklistDashboard = () => {
  const { data, isLoading} = useGetChecklistDashboardQuery()

  console.log({ data })

  return (
    <div>
      <div className="flex-row">
        <h2>Your checklist</h2>
        <div className="ml-auto">
          <ProgressCircle percentage={data?.progress ?? 0} size={30} strokeWidth={5} />
        </div>
      </div>
      <div>
        {data?.checklist_items?.map((checklistItem) => {
          return (
            <div key={checklistItem.id} className="flex-row">
              <p>{checklistItem.title}</p>
              <div className="ml-auto">
                <Button
                  action={() => null}
                  content="Mark as complete"
                  variant="link"
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ChecklistDashboard
