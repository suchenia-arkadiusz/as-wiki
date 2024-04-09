import styled from 'styled-components';

export const Left = styled.div`
  display: flex;
  left: 0;
  padding: 0;
`;

export const Right = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0;
`;

export const TableRowContainer = styled.tr`
  height: 50px;
  border-bottom: 1px solid #d9d9d9;
`;

export const TableCell = styled.td`
  color: #747474;
`;

export const IconsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  color: #747474;
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
