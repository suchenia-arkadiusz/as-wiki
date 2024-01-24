export type TreeListElement = {
  id: string;
  name: string;
  isExpanded: boolean;
  children: Array<TreeListElement>;
};
