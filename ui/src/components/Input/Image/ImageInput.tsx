import styled from 'styled-components';
import { ChangeEvent, HTMLProps } from 'react';

const ImageInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ImageInputElement = styled.input`
  border: none;
  border-bottom: 1px solid #d9d9d9;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  caret-color: #393939;

  &::placeholder {
    font-size: 0.8em;
  }

  &:active {
    border: none;
  }

  &:disabled {
    background-color: #f9f9f9;
    color: #a9a9a9;
  }
`;

type Props = HTMLProps<HTMLInputElement> & {
  label: string;
  inputKey: string | undefined;
  onChangeToBase64?: (_base64Image: string) => void;
  'data-testid'?: string;
};

const ImageInput = (props: Props) => {
  const { label, inputKey, onChange, onChangeToBase64 } = props;
  const dataTestId = props['data-testid'] ? props['data-testid'] : 'ImageInput';

  const handleOnChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];
    if (!file) return;

    if (onChange) {
      onChange(e);
      return;
    }
    if (!onChangeToBase64) return;

    const base64Image = await convertImageToBase64(file);
    onChangeToBase64(base64Image as string);
  };

  const convertImageToBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });

  return (
    <ImageInputContainer data-testid={dataTestId}>
      <label htmlFor={inputKey} data-testid={`${dataTestId}.label`}>
        {label}
      </label>
      <ImageInputElement
        data-testid={`${dataTestId}.input`}
        type="file"
        accept="image/*"
        onChange={handleOnChange}
        key={inputKey}
        id={inputKey}
      />
    </ImageInputContainer>
  );
};

export default ImageInput;
