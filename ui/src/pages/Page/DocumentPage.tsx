import styled from 'styled-components';
import PageListPanel from './components/PageListPanel/PageListPanel.tsx';
import { useProjectsContext } from '../../contexts/ProjectsContext.tsx';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { type CreatedByUser } from '../../types.ts';
import { formatDate } from '../../utils/date.ts';
import Button from '../../components/Button/Button.tsx';
import CreatePagePopup from './components/CreatePagePopup/CreatePagePopup.tsx';
import { usePagesContext } from '../../contexts/PagesContext.tsx';
import MDPreview from '../../components/MDEditor/MDPreview.tsx';
import EditPermissionsPopup from './components/EditPermissionsPopup/EditPermissionsPopup.tsx';
import { PagePermissionsProvider } from '../../contexts/PagePermissionsContext.tsx';
import AccessDeniedPage from '../Errors/403/AccessDeniedPage.tsx';

const DocumentPageContainer = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const PageContentContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 1000px;
  margin: 30px auto;
`;

const PageIconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin: 35px 30px;
`;

const DocumentPage = () => {
  const { projects } = useProjectsContext();
  const location = useLocation();
  const {page, deletePage, getPage} = usePagesContext();
  const [selectedPage, setSelectedPage] = useState<string>(location.pathname.split('/')[4]);
  const [createPagePopupProps, setCreatePagePopupProps] = useState<{ isPopupOpen: boolean; isEdit: boolean }>({ isPopupOpen: false, isEdit: false });
  const [isEditPermissionsPopupOpen, setIsEditPermissionsPopupOpen] = useState<boolean>(false);
  const projectId = location.pathname.split('/')[2];

  useEffect(() => {
    const pageId = location.pathname.split('/')[4];
    if (pageId && pageId.length > 0) {
      getPage(projectId, pageId);
    }
  }, [selectedPage, createPagePopupProps]);

  const openCreatePagePopup = (isEdit: boolean) => {
    setCreatePagePopupProps({ isEdit, isPopupOpen: true });
  };

  const closeCreatePagePopup = () => {
    setCreatePagePopupProps({ isEdit: false, isPopupOpen: false });
  };

  const openEditPermissionsPopup = () => {
    setIsEditPermissionsPopupOpen(true);
  };

  const closeEditPermissionsPopup = () => {
    setIsEditPermissionsPopupOpen(false);
  };

  const getUserDetails = (data?: CreatedByUser): string =>
    (data ? (data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : data.username) : '');

  const removePage = () => {
    const pageId = location.pathname.split('/')[4];
    deletePage(projectId, pageId);
  };

  return (
    <DocumentPageContainer data-testid="DocumentPage.container">
      <PagePermissionsProvider>
        <PageListPanel
          projectName={projects.find((project) => project.id === projectId)?.name || 'No Project'}
          onSelectedPage={setSelectedPage}
          onAddPage={openCreatePagePopup}
          selectedPageId={selectedPage}
        />
        {page
          ?
          page.id === 'access-denied' ? (
            <PageContentContainer data-testid='DocumentPage.pageContent.container.accessDenied'>
              <AccessDeniedPage />
            </PageContentContainer>
          ) : (
            <>
              <PageContentContainer data-testid='DocumentPage.pageContent.container.page'>
                <section>
                  <h1>{page?.name.toUpperCase()}</h1>
                  <p>
                Created by {getUserDetails(page?.createdBy)}, last updated at {formatDate(page?.updatedAt || new Date())} by{' '}
                    {getUserDetails(page?.updatedBy)}
                  </p>
                </section>
                <MDPreview value={page?.content || ''} />
              </PageContentContainer>
              <PageIconsContainer>
                <Button onClick={openEditPermissionsPopup} iconName="bi-lock" data-testid='DocumentPage.editPermissions.button' />
                <Button onClick={() => openCreatePagePopup(true) } iconName="bi-pen" data-testid='DocumentPage.editPage.button' />
                <Button onClick={removePage} iconName="bi-trash3" data-testid='DocumentPage.deletePage.button' />
                {/*<Button onClick={() => { alert('More'); }} iconName="bi-three-dots" />*/}
              </PageIconsContainer>
            </>
          )
          : null
        }
        {createPagePopupProps.isPopupOpen ? <CreatePagePopup onClose={closeCreatePagePopup} selectedPage={page} isEdit={createPagePopupProps.isEdit} /> : null}
        {isEditPermissionsPopupOpen ? <EditPermissionsPopup onClose={closeEditPermissionsPopup} /> : null}
      </PagePermissionsProvider>
    </DocumentPageContainer>
  );
};

export default DocumentPage;
