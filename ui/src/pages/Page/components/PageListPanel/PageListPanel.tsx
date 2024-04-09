import styled from 'styled-components';
import { usePagesContext } from '../../../../contexts/PagesContext.tsx';
import TreeList from '../../../../components/TreeList/TreeList.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { Right } from '../../../../components/styles.ts';
import Button from '../../../../components/Button/Button.tsx';

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
    top: 120px;
    left: 0;
    width: 300px;
    margin-left: 59px;
    height: 90%;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 85%, #ffffff 98%);
    z-index: 1;
    pointer-events: none;
  }
`;

type Props = {
  projectName: string;
  selectedPageId: string;
  onSelectedPage: (_id: string) => void;
  onAddPage: (_isEdit: boolean) => void;
};

const PageListPanel = (props: Props) => {
  const { projectName, selectedPageId, onSelectedPage, onAddPage } = props;
  const { pages } = usePagesContext();
  const location = useLocation();
  const navigate = useNavigate();

  const onSelect = (id: string) => {
    const projectId = location.pathname.split('/')[2];
    onSelectedPage(id);
    navigate(`/projects/${projectId}/pages/${id}`);
  };

  return (
    <PageListPanelContainer data-testid="PageListPanel.container">
      <Right>
        <Button iconName="bi-plus-lg" onClick={() => { onAddPage(false); }} text="Add Page" data-testid='PageListPanel.addPage.button' />
      </Right>
      <h1>{projectName}</h1>
      <TreeList selectedDataElementId={selectedPageId} data={pages} onSelect={onSelect} data-testid='PageListPanel.list' />
    </PageListPanelContainer>
  );
};

export default PageListPanel;
