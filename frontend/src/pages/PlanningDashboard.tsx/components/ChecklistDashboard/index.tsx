import React, { useState } from "react"
import Button from "../../../../components/Button"
import ProgressCircle from "../../../../components/ProgressCircle"
import { useCompleteChecklistItemMutation, useGetChecklistDashboardQuery } from "../../../../redux/dashboard/checklistDashboardApi"
import './style.scss'
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ChecklistItem } from "../../../../redux/checklist/types"

const ChecklistDashboard = () => {
  const { data, isLoading} = useGetChecklistDashboardQuery()
  const [ completeChecklistItem, { isLoading: isCompleteLoading, error }] = useCompleteChecklistItemMutation()

  const [expanded, setExpanded] = useState(true)

  const icon = expanded ?
    <FontAwesomeIcon icon={solid("chevron-down")} /> :
    <FontAwesomeIcon icon={solid("chevron-right")} />

  return (
    <div className="well-container">
      <div className={`well-header ${expanded ? 'open' : ''}`}>
        <Button
          action={() => setExpanded(!expanded)}
          content={icon}
          variant="link"
        />
        <h2>Your checklist</h2>
        <div className="ml-auto">
          <ProgressCircle percentage={data?.progress ?? 0} size={30} strokeWidth={5} label={true} />
        </div>
      </div>
      <div className={`well-content ${expanded ? 'open' : 'closed'}`}>
        {data?.checklist_items?.map((checklistItem: ChecklistItem) => {
          return (
            <div key={checklistItem.id} className="checklist-item-row">
              <p className="checklist-title">{checklistItem.title}</p>
              <div className="ml-auto flex-row">
                <Button
                  action={() => completeChecklistItem({id: checklistItem.id})}
                  content={<FontAwesomeIcon icon={solid("check")} />}
                  variant="link"
                />
                <Button
                  action={() => null}
                  content={<FontAwesomeIcon icon={regular("trash-can")} />}
                  variant="link-destructive"
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
