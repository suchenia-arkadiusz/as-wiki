export type TUser = {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string | undefined;
};

export type TRecentlyViewPage = {
  id: string;
  name: string;
  updatedAt: Date;
  updatedBy: string;
  username: string;
};

export type TProject = {
  id: string;
  name: string;
  description: string;
  color: string;
  logoUrl?: string;
};
