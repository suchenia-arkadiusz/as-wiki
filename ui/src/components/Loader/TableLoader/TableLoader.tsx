import { TableCell, TableRowContainer } from "../../styles.ts";
import Loader from "../Loader.tsx";

type TableLoaderProps = {
  nomOfColumns: number;
  numOfRows?: number;
};

const TableLoader = (props: TableLoaderProps) => {
  const { nomOfColumns } = props;

  const numOfRows = props.numOfRows || 5;

  return Array.from({ length: numOfRows }, (_, i) => (
    <TableRowContainer key={i}>
      {Array.from({ length: nomOfColumns }, (_, j) => (
        <TableCell key={(j + 1) * numOfRows} style={{ padding: "0 10px" }}>
          <Loader />
        </TableCell>
      ))}
    </TableRowContainer>
  ));
};

export default TableLoader;
