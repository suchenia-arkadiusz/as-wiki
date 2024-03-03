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
  selectedDataElementId: string;
  onSelect: (_id: string) => void;
  level?: number;
  'data-testid'?: string;
};

const TreeList = (props: Props) => {
  const { data, selectedDataElementId, level = 0, onSelect } = props;
  const [listData, setListData] = useState<TreeListElement[]>([]);

  useEffect(() => {
    if (!selectedDataElementId) {
      setListData(data);
      return;
    }

    if (data.find((item) => item.id === selectedDataElementId)) {
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

    if (elements.find((item) => item.id === selectedDataElementId)) {
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
    <div data-testid={props["data-testid"] ? `${props["data-testid"]}-${level}` : `TreeList.container-${level || 0}`}>
      {listData.map((item) => (
        <div key={item.id}>
          <TreeListItemContainer
            $margin={hasChildren(item) ? `${level * 25}px` : `${level * 25 + 26}px`}
            data-testid={`TreeList.item.container-${item.id}`}
          >
            {hasChildren(item) ? (
              <Button
                data-testid={`TreeList.item.expand-${item.id}`}
                iconName={item.isExpanded ? "bi-chevron-up" : "bi-chevron-down"}
                onClick={() => {
                  toggleItem(item.id);
                }}
              />
            ) : null}
            <Button
              onClick={() => {
                onSelect(item.id);
              }}
              text={item.name}
            />
          </TreeListItemContainer>
          {item.isExpanded ? (
            <TreeList selectedDataElementId={selectedDataElementId} data={item.children} level={level + 1} onSelect={onSelect} />
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default TreeList;
