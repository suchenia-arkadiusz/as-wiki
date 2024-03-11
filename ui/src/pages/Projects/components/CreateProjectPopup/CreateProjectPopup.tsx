import Popup from '../../../../components/Popup/Popup.tsx';
import Input from '../../../../components/Input/Input.tsx';
import { useRef, useState } from 'react';
import Button from '../../../../components/Button/Button.tsx';
import styled from 'styled-components';
import { validateStringInput } from '../../../../utils/validators.ts';
import { useProjectsContext } from '../../../../contexts/ProjectsContext.tsx';
import { Project } from '../../types.ts';
import MDEditor from '../../../../components/MDEditor/MDEditor.tsx';

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

  const isButtonDisabled = () => {
    return !validatedForm.name || !validatedForm.shortDescription;
  };

  return (
    <Popup title={isEdit ? 'Edit Project' : 'Create project'} width={1400} onClose={onClose}>
      <CreateProjectContainer
        data-testid="CreateProject.container"
        data-color-mode='light'
      >
        <Input
          data-testid='CreateProject.input.name'
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
          data-testid='CreateProject.input.shortDescription'
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
        <div data-testid="CreateProject.editor.description">
          <MDEditor value={description} onChange={setDescription} />
        </div>
        <CreateProjectButtonContainer data-testid="CreateProject.button.container">
          <Button iconName="bi-floppy" onClick={onSubmit} text="Save" disabled={isButtonDisabled()} data-testid="CreateProject.button.save" />
        </CreateProjectButtonContainer>
      </CreateProjectContainer>
    </Popup>
  );
};

export default CreateProjectPopup;
