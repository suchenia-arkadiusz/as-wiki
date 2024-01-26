import { TreeListElement } from "../../types.ts";
import Button from "../Button/Button.tsx";
import { useEffect, useState } from "react";
import styled from "styled-components";

const TreeListItemContainer = styled.div<{ $margin: string }>`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-left: ${(props) => props.$margin};
  margin-bottom: 10px;
  width: 100%;
`;

type TreeListProps = {
  data: Array<TreeListElement>;
  onSelect: (id: string) => void;
  level?: number;
};

const TreeList = (props: TreeListProps) => {
  const { data, level = 0, onSelect } = props;
  const [listData, setListData] = useState<Array<TreeListElement>>([]);

  useEffect(() => {
    setListData(data);
  }, [data]);

  const toggleItem = (id: string) => {
    const items = [...listData];

    const index = items.findIndex((item) => item.id === id);
    items[index].isExpanded = !items[index].isExpanded;

    setListData(items);
  };

  return (
    <>
      {listData.map((item) => (
        <div key={item.id}>
          <TreeListItemContainer $margin={hasChildren(item) ? `${level * 25}px` : `${level * 25 + 26}px`}>
            {hasChildren(item) ? (
              <>
                <Button iconName={item.isExpanded ? "bi-chevron-up" : "bi-chevron-down"} onClick={() => toggleItem(item.id)} />
                <Button onClick={() => onSelect(item.id)} text={item.name} />
              </>
            ) : (
              <Button onClick={() => onSelect(item.id)} text={item.name} />
            )}
          </TreeListItemContainer>
          {item.isExpanded ? <TreeList data={item.children} level={level + 1} onSelect={onSelect} /> : null}
        </div>
      ))}
    </>
  );
};

const hasChildren = (item: TreeListElement) => item.children && item.children.length > 0;

export default TreeList;
