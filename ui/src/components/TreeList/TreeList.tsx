import { type TreeListElement } from '../../types.ts';
import Button from '../Button/Button.tsx';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const TreeListItemContainer = styled.div<{ $margin: string }>`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-left: ${(props) => props.$margin};
  margin-bottom: 10px;
  width: 100%;
`;

type Props = {
  data: TreeListElement[];
  selectedPageId: string;
  onSelect: (_id: string) => void;
  level?: number;
};

const TreeList = (props: Props) => {
  const { data, selectedPageId, level = 0, onSelect } = props;
  const [listData, setListData] = useState<TreeListElement[]>([]);

  useEffect(() => {
    if (!selectedPageId) return;

    if (data.find((item) => item.id === selectedPageId)) {
      setListData(data);
    } else {
      data.forEach((item) => {
        const shouldBeExpanded = openElement(item.children);
        if (shouldBeExpanded) {
          item.isExpanded = true;
        }
      });
      setListData(data);
    }
  }, [data]);

  const openElement = (elements: TreeListElement[]) => {
    if (!elements || elements.length === 0) return;

    let result = false;

    if (elements.find((item) => item.id === selectedPageId)) {
      result = true;
    } else {
      elements.forEach((item) => {
        const shouldBeExpanded = openElement(item.children);
        if (shouldBeExpanded) {
          item.isExpanded = true;
          result = true;
        }
      });
    }
    return result;
  };

  const toggleItem = (id: string) => {
    const items = [...listData];

    const index = items.findIndex((item) => item.id === id);
    items[index].isExpanded = !items[index].isExpanded;

    setListData(items);
  };

  const hasChildren = (item: TreeListElement) => item.children && item.children.length > 0;

  return (
    <>
      {listData.map((item) => (
        <div key={item.id}>
          <TreeListItemContainer $margin={hasChildren(item) ? `${level * 25}px` : `${(level * 25) + 26}px`}>
            {hasChildren(item)
              ? (
                <>
                  <Button iconName={item.isExpanded ? 'bi-chevron-up' : 'bi-chevron-down'} onClick={() => { toggleItem(item.id); }} />
                  <Button onClick={() => { onSelect(item.id); }} text={item.name} />
                </>
              )
              : (
                <Button onClick={() => { onSelect(item.id); }} text={item.name} />
              )}
          </TreeListItemContainer>
          {item.isExpanded ? <TreeList selectedPageId={selectedPageId} data={item.children} level={level + 1} onSelect={onSelect} /> : null}
        </div>
      ))}
    </>
  );
};

export default TreeList;
