export type User = {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
};

export type RegisterUser = {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type UserGroup = {
  id: string;
  name: string;
};

export type PagePermission = {
  permissions?: Array<{
    pageId: string;
    userId: string | undefined;
    groupId: string | undefined;
  }>;
  inheritedPermissions?: Array<{
    pageId: string;
    userId: string | undefined;
    groupId: string | undefined;
  }>;
};

export type RecentlyViewPage = {
  id: string;
  name: string;
  updatedAt: Date;
  updatedBy: string;
  username: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  color?: string;
  logoUrl?: string;
};
