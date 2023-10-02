import { ChecklistItem } from "../checklist/types"

type GetChecklistDashboardResponse = {
  checklist_items: ChecklistItem[]
  progress: number
  has_more: boolean
}

type CompleteChecklistItemResponse = {
  success: boolean
}

type CompleteChecklistItemArg = {
  id: number
}

type DeleteChecklistItemResponse = CompleteChecklistItemResponse
type DeleteChecklistItemArg = CompleteChecklistItemArg
