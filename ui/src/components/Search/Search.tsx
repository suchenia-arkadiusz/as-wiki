import Input from '../Input/Input.tsx';
import { useRef, useState } from 'react';
import styled from 'styled-components';

const DataContainer = styled.div`
  display: block;
  flex-direction: column;
  position: absolute;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  overflow: auto;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  top: 130px;
  max-height: 250px;
  cursor: pointer;
`;

const DataElement = styled.div`
  display: flex;
  width: 250px;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #d9d9d9;
`;

type Props = {
  onChange: (_value: string) => void;
  onSelect: (_value: DataType) => void;
  data: Array<DataType>;
};

export type DataType = {
  key: string;
  value: string;
};

const Search = (props: Props) => {
  const { onChange, data, onSelect } = props;
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleOnSelect = (item: DataType) => {
    setSearchTerm(item.value);
    onSelect(item);
  };

  const handleOnChange = (value: string) => {
    setSearchTerm(value);
    onChange(value);
  };

  return (
    <div data-testid="Search.container">
      <Input
        ref={searchRef}
        inputKey="search"
        label=""
        placeholder="Search"
        validated
        onChange={() => handleOnChange(searchRef.current?.value || '')}
        value={searchTerm}
      />
      <DataContainer data-testid="Search.data.container">
        {data.map((item) => (
          <DataElement key={item.key}
                       onClick={() => handleOnSelect(item)}
                       data-testid={`Search.data.element-${item.key}`}>
            {item.value}
          </DataElement>
        ))}
      </DataContainer>
    </div>
  );
};

export default Search;
