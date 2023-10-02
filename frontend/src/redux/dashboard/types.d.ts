import { ChecklistItem } from "../checklist/types"

type GetChecklistDashboardResponse = {
  checklist_items: ChecklistItem[]
  progress: number
}

type CompleteChecklistItemResponse = {
  success: boolean
}

type CompleteChecklistItemArg = {
  id: number
}
