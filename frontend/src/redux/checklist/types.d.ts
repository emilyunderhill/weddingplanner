export type ChecklistItem = {
  id: number,
  title: string,
  priority: number,
  status: number,
  created_by: User,
  created_at: string,
  updated_by: User,
  updated_at: string,
}

type CreateChecklistItemResponse = ChecklistItem
type CreateChecklistItemArg = {
  title: string
  topPriority?: boolean
}

type GetChecklistArg = {
  limit: number
}
type GetChecklistResponse = {
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
