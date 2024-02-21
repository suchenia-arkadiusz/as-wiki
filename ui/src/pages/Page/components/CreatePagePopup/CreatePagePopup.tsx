import Popup from '../../../../components/Popup/Popup.tsx';
import { type Page } from '../../../../types.ts';
import styled from 'styled-components';
import Button from '../../../../components/Button/Button.tsx';
import { useRef, useState } from 'react';
import { usePagesContext } from '../../../../contexts/PagesContext.tsx';
import Input from '../../../../components/Input/Input.tsx';
import { validateStringInput } from '../../../../utils/validators.ts';
import { useLocation } from 'react-router-dom';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

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

const EditorContainer = styled.div`
  height: 800px;
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

  return (
    <Popup title={isEdit ? 'Edit Page' : 'Create Page'} width={1400} onClose={onClose}>
      <CreatePageContainer data-testid="CreatePage.container" data-color-mode="light">
        <Input
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
        <EditorContainer>
          <MdEditor
            showCodeRowNumber={true}
            footers={[]}
            toolbarsExclude={['save', 'prettier', 'pageFullscreen', 'fullscreen', 'htmlPreview', 'catalog', 'github']}
            editorId='page-content-editor'
            codeTheme='stackoverfloew'
            language='en-US'
            modelValue={value}
            onChange={setValue}
            preview={false}
          />
        </EditorContainer>
        <CreatePageButtonContainer data-testid="CreatePage.button.container">
          <Button iconName="bi-floppy" onClick={onSubmit} text="Save" disabled={!validatedName} />
        </CreatePageButtonContainer>
      </CreatePageContainer>
    </Popup>
  );
};

export default CreatePagePopup;
