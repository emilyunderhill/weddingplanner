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

type GenericSuccessResponse = {
  success: boolean
}

type CreateChecklistItemResponse = ChecklistItem
type CreateChecklistItemArg = {
  title: string
  topPriority?: boolean
}

type GetFullChecklistResponse = {
  open_checklist_items: ChecklistItem[]
  closed_checklist_items: ChecklistItem[]
  progress: number
}

type GetChecklistResponse = {
  checklist_items: ChecklistItem[]
  progress: number
  has_more: boolean
}

type CompleteChecklistItemResponse = GenericSuccessResponse
type CompleteChecklistItemArg = {
  id: number
}

type DeleteChecklistItemResponse = GenericSuccessResponse
type DeleteChecklistItemArg = {
  id: number
}

type RenameChecklistItemResponse = GenericSuccessResponse
type RenameChecklistItemArg = {
  id: number
  title: string
}
