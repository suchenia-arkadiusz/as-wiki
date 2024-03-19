import styled from 'styled-components';

const NotFoundPageContainer = styled.div`
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
`;

const NotFoundPage = () => {
  return (
    <NotFoundPageContainer>
      <h1>404 Page Not Found</h1>
    </NotFoundPageContainer>
  );
};

export default NotFoundPage;
