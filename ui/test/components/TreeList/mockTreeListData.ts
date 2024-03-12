import { TreeListElement } from '../../../src/types.ts';

export const mockTreeListData: TreeListElement[] = [
  {
    id: '1',
    name: 'Page 1',
    isExpanded: false,
    children: [
      {
        id: '2',
        name: 'Page 1.1',
        isExpanded: false,
        children: [],
        parentId: '1'
      },
      {
        id: '3',
        name: 'Page 1.2',
        isExpanded: false,
        children: [
          {
            id: '7',
            name: 'Page 1.2.1',
            isExpanded: false,
            children: [],
            parentId: '1'
          }
        ],
        parentId: '1'
      }
    ]
  },
  {
    id: '4',
    name: 'Page 2',
    isExpanded: false,
    children: [
      {
        id: '5',
        name: 'Page 2.1',
        isExpanded: false,
        children: [],
        parentId: '4'
      },
      {
        id: '6',
        name: 'Page 2.2',
        isExpanded: false,
        children: [],
        parentId: '4'
      }
    ]
  }
];
