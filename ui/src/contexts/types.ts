export type User = {
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
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
  color?: string;
  logoUrl?: string;
};
