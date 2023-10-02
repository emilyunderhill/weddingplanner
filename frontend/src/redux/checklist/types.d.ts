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

export type CreateChecklistItemArg = {
  title: string
  topPriority?: boolean
}

export type CreateChecklistItemResponse = ChecklistItem

export type GetChecklistResponse = ChecklistItem[]
