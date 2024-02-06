import { TableCell, TableRowContainer } from '../../styles.ts';
import Loader from '../Loader.tsx';

interface TableLoaderProps {
  numOfColumns: number
  numOfRows?: number
}

const TableLoader = (props: TableLoaderProps) => {
  const { numOfColumns } = props;

  const numOfRows = props.numOfRows || 5;

  return Array.from({ length: numOfRows }, (_, i) => (
    <TableRowContainer key={i} data-testid="TableLoaderRowContainer">
      {Array.from({ length: numOfColumns }, (_, j) => (
        <TableCell key={(j + 1) * numOfRows} style={{ padding: '0 10px' }} data-testid="TableLoaderCellContainer">
          <Loader />
        </TableCell>
      ))}
    </TableRowContainer>
  ));
};

export default TableLoader;
