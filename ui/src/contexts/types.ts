export interface TUser {
  username: string
  email: string
  firstName?: string
  lastName?: string
  avatarUrl?: string
}

export interface TRecentlyViewPage {
  id: string
  name: string
  updatedAt: Date
  updatedBy: string
  username: string
}

export interface TProject {
  id: string
  name: string
  description: string
  color: string
  logoUrl?: string
}

export interface PageListElementChild {
  id: string
  name: string
}
