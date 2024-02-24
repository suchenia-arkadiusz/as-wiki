export type TreeListElement = {
  id: string;
  name: string;
  isExpanded: boolean;
  children: TreeListElement[];
  parentId?: string;
};

export type Page = {
  id: string;
  name: string;
  content?: string;
  updatedAt: Date;
  updatedBy: CreatedByUser;
  createdBy: CreatedByUser;
  parentId?: string;
};

export type CreatedByUser = {
  id: string;
  firstName?: string;
  lastName?: string;
  username: string;
};
