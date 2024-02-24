import Popup from '../../../../components/Popup/Popup.tsx';
import Input from '../../../../components/Input/Input.tsx';
import { useRef, useState } from 'react';
import Button from '../../../../components/Button/Button.tsx';
import styled from 'styled-components';
import { validateStringInput } from '../../../../utils/validators.ts';
import { useProjectsContext } from '../../../../contexts/ProjectsContext.tsx';
import { Project } from '../../types.ts';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

const CreateProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const CreateProjectButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const EditorContainer = styled.div`
  height: 800px;
`;

type Props = {
  onClose: () => void;
  selectedProject: Project | undefined;
  isEdit: boolean;
};

const CreateProjectPopup = (props: Props) => {
  const { onClose, selectedProject, isEdit } = props;
  const nameRef = useRef<HTMLInputElement>(null);
  const shortDescriptionRef = useRef<HTMLInputElement>(null);
  const [description, setDescription] = useState<string>(isEdit ? selectedProject?.description || '' : '');
  const projectsContext = useProjectsContext();

  const [validatedForm, setValidatedForm] = useState({
    name: isEdit,
    shortDescription: isEdit
  });

  const onSubmit = async () => {
    if (isEdit) {
      projectsContext.editProject(
        {
          ...selectedProject,
          id: selectedProject?.id || '',
          name: nameRef.current?.value || '',
          description,
          shortDescription: shortDescriptionRef.current?.value || ''},
        onClose
      );
    } else {
      projectsContext.addProject(
        {id: '',
          name: nameRef.current?.value || '',
          description,
          shortDescription: shortDescriptionRef.current?.value || ''},
        onClose
      );
    }
  };

  return (
    <Popup title={isEdit ? 'Edit Project' : 'Create project'} width={1400} onClose={onClose}>
      <CreateProjectContainer
        data-testid="CreateProject.container"
        data-color-mode='light'
      >
        <Input
          ref={nameRef}
          isRequired
          inputKey="project-name"
          label="Name"
          placeholder="Project name"
          type="text"
          validated={validatedForm.name}
          onChange={() => {
            setValidatedForm({ ...validatedForm, name: validateStringInput(nameRef.current?.value || '') });
          }}
          defaultValue={isEdit ? selectedProject?.name : undefined}
        />
        <Input
          ref={shortDescriptionRef}
          isRequired
          inputKey="project-short-description"
          label="Short Description"
          placeholder="Short description"
          type="text"
          validated={validatedForm.shortDescription}
          onChange={() => {
            setValidatedForm({ ...validatedForm, shortDescription: validateStringInput(shortDescriptionRef.current?.value || '') });
          }}
          defaultValue={isEdit ? selectedProject?.shortDescription : undefined}
        />
        <EditorContainer data-testid='CreateProject.description'>
          <MdEditor
            showCodeRowNumber={true}
            footers={[]}
            toolbarsExclude={['save', 'prettier', 'pageFullscreen', 'fullscreen', 'htmlPreview', 'catalog', 'github']}
            editorId='page-content-editor'
            codeTheme='stackoverfloew'
            language='en-US'
            modelValue={description}
            onChange={setDescription}
            preview={false}
          />
        </EditorContainer>
        <CreateProjectButtonContainer data-testid="CreateProject.button.container">
          <Button iconName="bi-floppy" onClick={onSubmit} text="Save" />
        </CreateProjectButtonContainer>
      </CreateProjectContainer>
    </Popup>
  );
};

export default CreateProjectPopup;
