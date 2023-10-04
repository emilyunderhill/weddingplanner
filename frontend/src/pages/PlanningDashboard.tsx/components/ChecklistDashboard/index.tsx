import React, { FC, useEffect, useState } from "react"
import Button from "../../../../components/Button"
import ProgressCircle from "../../../../components/ProgressCircle"
import { useCompleteChecklistItemMutation, useDeleteChecklistItemMutation, useGetChecklistDashboardQuery } from "../../../../redux/checklist/checklistApi"
import './style.scss'
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useNavigate } from "react-router-dom";
import { ROUTE_CHECKLIST } from "../../../../library/routes"
import { ChecklistItem } from "../../../../redux/checklist/types"

type Props = {
  openCreateModal: () => void
}

const ChecklistDashboard: FC<Props> = ({ openCreateModal }) => {
  const { data, isLoading} = useGetChecklistDashboardQuery({ limit: 5 })
  const [ completeChecklistItem, { isLoading: isCompleteLoading }] = useCompleteChecklistItemMutation()
  const [ deleteChecklistItem, { isLoading: isDeleteLoading }] = useDeleteChecklistItemMutation()

  const [expanded, setExpanded] = useState(false)

  const navigate = useNavigate()

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
        <h2>Checklist</h2>
        <div className="ml-sm">
          <FontAwesomeIcon icon={solid("list-check")} />
        </div>
        <div className="ml-auto">
          <ProgressCircle percentage={data?.progress ?? 0} size={30} strokeWidth={5} label={true} />
        </div>
      </div>
      <div className={`well-content ${expanded ? 'open' : ''}`}>
          {data?.checklist_items?.map((checklistItem: ChecklistItem) => {
            return (
              <div key={checklistItem.id} className="checklist-item-row">
                <p className="checklist-title">{checklistItem.title}</p>
                <div className="ml-auto flex-row">
                  <Button
                    action={() => completeChecklistItem({id: checklistItem.id})}
                    content={<FontAwesomeIcon icon={solid("check")} />}
                    variant="link"
                    isLoading={isCompleteLoading}
                  />
                  <Button
                    action={() => deleteChecklistItem({id: checklistItem.id})}
                    content={<FontAwesomeIcon icon={regular("trash-can")} />}
                    variant="link-destructive"
                    isLoading={isDeleteLoading}
                  />
                </div>
              </div>
            )
          })}
        {!!data?.has_more && (
          <div className="checklist-item-row">
            <p className="helpertext">{data.has_more} more...</p>
          </div>
        )}
        <div className="well-footer">
          <Button
            action={openCreateModal}
            content={<FontAwesomeIcon icon={solid("plus")} />}
            variant="link"
          />
          <div className="ml-auto">
            <Button
              action={() => navigate(ROUTE_CHECKLIST)}
              content="View all"
              variant="link"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChecklistDashboard
