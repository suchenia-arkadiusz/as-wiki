import styled from "styled-components";
import PageListPanel from "./components/PageListPanel/PageListPanel.tsx";
import { useProjectsContext } from "../../contexts/ProjectsContext.tsx";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRestApiContext } from "../../contexts/RestApiContext.tsx";
import { CreatedByUser, Page } from "../../types.ts";
import { formatDate } from "../../utils/date.ts";

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
  margin: 30px 230px;
`;

const DocumentPage = () => {
  const api = useRestApiContext();
  const { projects } = useProjectsContext();
  const location = useLocation();
  const [selectedPage, setSelectedPage] = useState<string>("");
  const [page, setPage] = useState<Page | undefined>(undefined);
  const projectId = location.pathname.split("/")[2];

  useEffect(() => {
    const pageId = location.pathname.split("/")[4];
    if (pageId && pageId.length > 0)
      api.get(`/api/v1/projects/${projectId}/pages/${pageId}`).then((response) => {
        if (response.status === 200) {
          response.json().then((data: Page) => {
            setPage(data);
          });
        }
      });
  }, [selectedPage]);

  const getUserDetails = (data?: CreatedByUser): string =>
    data ? (data.firstName && data.lastName ? `${data.firstName} ${data.lastName}` : data.username) : "";

  return (
    <DocumentPageContainer data-testid="DocumentPageContainer">
      <PageListPanel
        projectName={projects.find((project) => project.id === projectId)?.name || "No Project"}
        setSelectedPage={setSelectedPage}
      />
      <PageContentContainer>
        <section>
          <h1>{page?.name.toUpperCase()}</h1>
          <p>
            Created by {getUserDetails(page?.createdBy)}, last updated at {formatDate(page?.updatedAt || new Date())} by{" "}
            {getUserDetails(page?.updatedBy)}
          </p>
        </section>
        <article style={{ marginTop: "30px", color: "#747474" }}>{page?.content}</article>
      </PageContentContainer>
    </DocumentPageContainer>
  );
};

export default DocumentPage;
