import styled from "styled-components";
import { usePageListContext } from "../../../../contexts/PageListContext.tsx";
import TreeList from "../../../../components/TreeList/TreeList.tsx";
import { useLocation, useNavigate } from "react-router-dom";

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
    left: 0;
    width: 300px;
    margin-top: 10px;
    margin-left: 59px;
    height: 100%;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 85%, #ffffff 98%);
    z-index: 1;
    pointer-events: none;
  }
`;

type PageListPanelProps = {
  projectName: string;
  setSelectedPage: (id: string) => void;
};

const PageListPanel = (props: PageListPanelProps) => {
  const { projectName, setSelectedPage } = props;
  const { pages } = usePageListContext();
  const location = useLocation();
  const navigate = useNavigate();

  const onSelect = (id: string) => {
    const projectId = location.pathname.split("/")[2];
    setSelectedPage(id);
    navigate(`/projects/${projectId}/pages/${id}`);
  };

  return (
    <PageListPanelContainer data-testid="PageListPanelContainer">
      <h1>{projectName}</h1>
      <TreeList data={pages} onSelect={onSelect} />
    </PageListPanelContainer>
  );
};

export default PageListPanel;
