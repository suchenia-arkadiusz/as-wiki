import styled from "styled-components";
import { usePageListContext } from "../../../../contexts/PageListContext.tsx";
import TreeList from "../../../../components/TreeList/TreeList.tsx";

const PageListPanelContainer = styled.div`
  display: flex;
  width: 300px;
  height: 100%;
  border-right: 1px solid #d9d9d9;
  padding: 30px;
  flex-basis: 300px;
  flex-direction: column;
  overflow: hidden;

  & button {
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:after {
    content: "";
    position: absolute;
    top: 100px;
    left: 320px;
    width: 40px;
    margin-top: 30px;
    height: 100%;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #ffffff 100%);
    z-index: 1;
    pointer-events: none;
  }
`;

type PageListPanelProps = {
  projectName: string;
};

const PageListPanel = (props: PageListPanelProps) => {
  const { projectName } = props;
  const { pages } = usePageListContext();

  const onSelect = (id: string) => {
    console.log(id);
  };

  return (
    <PageListPanelContainer data-testid="PageListPanelContainer">
      <h1>{projectName}</h1>
      <TreeList data={pages} onSelect={onSelect} />
    </PageListPanelContainer>
  );
};

export default PageListPanel;
