import Input from '../Input/Input.tsx';
import { useRef, useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  max-height: 60px;
  width: 270px;
  position: relative;
`;

const DataOverlay = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background: none;
`;

const DataContainer = styled.div`
  display: block;
  flex-direction: column;
  position: absolute;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  overflow: auto;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  top: 60px;
  max-height: 250px;
  width: 270px;
  cursor: pointer;
  z-index: 1000;
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
  onSelect: (_value: DataType | undefined) => void;
  data: Array<DataType>;
  'data-testid'?: string;
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

  const dataTestId = props['data-testid'] ? props['data-testid'] : 'Search';

  return (
    <SearchContainer data-testid={`${dataTestId}.container`}>
      <Input
        data-testid={`${dataTestId}.input`}
        ref={searchRef}
        inputKey="search"
        label=""
        placeholder="Search"
        validated
        onChange={() => handleOnChange(searchRef.current?.value || '')}
        value={searchTerm}
      />
      {data && data.length > 0 ? (
        <>
          <DataOverlay data-testid={`${dataTestId}.data.overlay`} onClick={() => onSelect(undefined)} />
          <DataContainer data-testid={`${dataTestId}.data.container`}>
            {data.map((item) => (
              <DataElement key={item.key} onClick={() => handleOnSelect(item)} data-testid={`${dataTestId}.data.element-${item.key}`}>
                {item.value}
              </DataElement>
            ))}
          </DataContainer>
        </>
      ) : null}
    </SearchContainer>
  );
};

export default Search;
