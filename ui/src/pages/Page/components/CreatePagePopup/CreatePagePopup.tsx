import Popup from '../../../../components/Popup/Popup.tsx';
import { ImageUploadResponse, type Page } from '../../../../types.ts';
import styled from 'styled-components';
import Button from '../../../../components/Button/Button.tsx';
import { useRef, useState } from 'react';
import { usePagesContext } from '../../../../contexts/PagesContext.tsx';
import Input from '../../../../components/Input/Input.tsx';
import { validateStringInput } from '../../../../utils/validators.ts';
import { useLocation } from 'react-router-dom';
import MDEditor from '../../../../components/MDEditor/MDEditor.tsx';
import { useRestApiContext } from '../../../../contexts/RestApiContext.tsx';

const CreatePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CreatePageButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

type CreatePagePopupProps = {
  onClose: () => void;
  selectedPage: Page | undefined;
  isEdit?: boolean;
};

const CreatePagePopup = (props: CreatePagePopupProps) => {
  const { onClose, selectedPage, isEdit = false } = props;
  const nameRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const {createPage, updatePage} = usePagesContext();
  const api = useRestApiContext();
  const [value, setValue] = useState<string>(isEdit ? selectedPage?.content || '' : '');

  const [validatedName, setValidatedName] = useState<boolean>(isEdit);

  const onSubmit = async () => {
    const projectId = location.pathname.split('/')[2];
    const body = {
      name: nameRef.current?.value || '',
      content: value,
      parentId: isEdit ? selectedPage?.parentId : selectedPage?.id || undefined
    };

    if (isEdit) {
      updatePage(projectId, selectedPage?.id || '', body, onClose);
    } else {
      createPage(projectId, body, onClose);
    }
  };

  const onImageUpload = async (images: File[]): Promise<string[]> => {
    const result: Array<ImageUploadResponse> = await Promise.all<ImageUploadResponse>(
      images.map((image) => {
        return new Promise((resolve, reject) => {
          const form = new FormData();
          form.append('file', image);

          api.post('/upload', form, false)
            .then((response) => response.json())
            .then((data: ImageUploadResponse) => resolve(data))
            .catch((error) => reject(error));
        });
      })
    );

    return result.map((item) => `${import.meta.env.VITE_APP_API_URL}/upload/${item.id}`);
  };

  return (
    <Popup title={isEdit ? 'Edit Page' : 'Create Page'} width={1400} onClose={onClose}>
      <CreatePageContainer data-testid="CreatePage.container" data-color-mode="light">
        <Input
          data-testid='CreatePage.name'
          ref={nameRef}
          isRequired
          inputKey="page-name"
          label="Name"
          placeholder="Page name"
          type="text"
          validated={validatedName}
          onChange={() => { setValidatedName(nameRef.current ? validateStringInput(nameRef.current.value) : false); }}
          defaultValue={isEdit ? selectedPage?.name : undefined}
        />
        <MDEditor value={value} onChange={setValue} onImageUpload={onImageUpload}/>
        <CreatePageButtonContainer data-testid="CreatePage.button.container">
          <Button iconName="bi-floppy" onClick={onSubmit} text="Save" disabled={!validatedName} data-testid='CreatePage.button.save' />
        </CreatePageButtonContainer>
      </CreatePageContainer>
    </Popup>
  );
};

export default CreatePagePopup;
