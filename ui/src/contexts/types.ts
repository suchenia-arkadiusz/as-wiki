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
