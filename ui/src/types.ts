export interface TreeListElement {
  id: string
  name: string
  isExpanded: boolean
  children: TreeListElement[]
}

export interface Page {
  id: string
  name: string
  content?: string
  updatedAt: Date
  updatedBy: CreatedByUser
  createdBy: CreatedByUser
  parentId?: string
}

export interface CreatedByUser {
  id: string
  firstName?: string
  lastName?: string
  username: string
}
