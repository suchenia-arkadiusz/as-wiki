import styled from 'styled-components';
import PageListPanel from './components/PageListPanel/PageListPanel.tsx';
import { useProjectsContext } from '../../contexts/ProjectsContext.tsx';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRestApiContext } from '../../contexts/RestApiContext.tsx';
import { type CreatedByUser, type Page } from '../../types.ts';
import { formatDate } from '../../utils/date.ts';
import Button from '../../components/Button/Button.tsx';
import CreatePagePopup from './components/CreatePagePopup/CreatePagePopup.tsx';
import { useToasterContext } from '../../contexts/ToasterContext.tsx';
import { MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

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
  const api = useRestApiContext();
  const { projects } = useProjectsContext();
  const location = useLocation();
  const toasterContext = useToasterContext();
  const [selectedPage, setSelectedPage] = useState<string>(location.pathname.split('/')[4]);
  const [page, setPage] = useState<Page | undefined>(undefined);
  const [popupProps, setPopupProps] = useState<{ isPopupOpen: boolean; isEdit: boolean }>({ isPopupOpen: false, isEdit: false });
  const projectId = location.pathname.split('/')[2];

  useEffect(() => {
    const pageId = location.pathname.split('/')[4];
    if (pageId && pageId.length > 0) {
      api.get(`/api/v1/projects/${projectId}/pages/${pageId}`).then((response: Response) => {
        if (response.status === 200) {
          response.json().then((data: Page) => {
            setPage(data);
          });
        }
      });
    }
  }, [selectedPage, popupProps]);

  const openPopup = (isEdit: boolean) => {
    setPopupProps({ isEdit, isPopupOpen: true });
  };

  const closePopup = () => {
    setPopupProps({ isEdit: false, isPopupOpen: false });
  };

  const getUserDetails = (data?: CreatedByUser): string =>
    (data ? (data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : data.username) : '');

  const deletePage = () => {
    const pageId = location.pathname.split('/')[4];
    api.del(`/api/v1/projects/${projectId}/pages/${pageId}`).then((response: Response) => {
      if (response.status === 204) {
        setPage(undefined);
        toasterContext.addToast('Page deleted successfully!', 'SUCCESS');
      } else {
        toasterContext.addToast('Something went wrong!', 'ERROR');
      }
    });
  };

  return (
    <DocumentPageContainer data-testid="DocumentPageContainer">
      <PageListPanel
        projectName={projects.find((project) => project.id === projectId)?.name || 'No Project'}
        onSelectedPage={setSelectedPage}
        onAddPage={openPopup}
      />
      {page
        ? (
          <>
            <PageContentContainer>
              <section>
                <h1>{page?.name.toUpperCase()}</h1>
                <p>
                Created by {getUserDetails(page?.createdBy)}, last updated at {formatDate(page?.updatedAt || new Date())} by{' '}
                  {getUserDetails(page?.updatedBy)}
                </p>
              </section>
              <article data-color-mode="light">
                <MdPreview
                  modelValue={page?.content || ''}
                  language='en-US'
                  codeTheme='stackoverflow'/>
              </article>
            </PageContentContainer>
            <PageIconsContainer>
              <Button onClick={() => { alert('Edit Permissions'); }} iconName="bi-lock" />
              <Button onClick={() => openPopup(true) } iconName="bi-pen" />
              <Button onClick={deletePage} iconName="bi-trash3" />
              <Button onClick={() => { alert('More'); }} iconName="bi-three-dots" />
            </PageIconsContainer>
          </>
        )
        : null}
      {popupProps.isPopupOpen ? <CreatePagePopup onClose={closePopup} selectedPage={page} isEdit={popupProps.isEdit} /> : null}
    </DocumentPageContainer>
  );
};

export default DocumentPage;
