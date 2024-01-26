export type TreeListElement = {
  id: string;
  name: string;
  isExpanded: boolean;
  children: Array<TreeListElement>;
};

export type Page = {
  id: string;
  name: string;
  content?: string;
  updatedAt: Date;
  updatedBy: CreatedByUser;
  createdBy: CreatedByUser;
};

export type CreatedByUser = {
  id: string;
  firstName?: string;
  lastName?: string;
  username: string;
};
