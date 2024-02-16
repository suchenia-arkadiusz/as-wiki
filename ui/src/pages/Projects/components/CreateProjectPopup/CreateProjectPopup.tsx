import Popup from '../../../../components/Popup/Popup.tsx';
import Input from '../../../../components/Input/Input.tsx';
import TextArea from '../../../../components/TextArea/TextArea.tsx';
import { useRef, useState } from 'react';
import Button from '../../../../components/Button/Button.tsx';
import styled from 'styled-components';
import { validateStringInput } from '../../../../utils/validators.ts';
import { useProjectsContext } from '../../../../contexts/ProjectsContext.tsx';
import { Project } from '../../types.ts';

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

type CreatePagePopupProps = {
  onClose: () => void;
  selectedProject: Project | undefined;
  isEdit: boolean;
};

const CreateProjectPopup = (props: CreatePagePopupProps) => {
  const { onClose, selectedProject, isEdit } = props;
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const projectsContext = useProjectsContext();

  const [validatedForm, setValidatedForm] = useState({
    name: isEdit,
    description: isEdit
  });

  const onSubmit = async () => {
    if (isEdit) {
      projectsContext.editProject({...selectedProject, id: selectedProject?.id || '', name: nameRef.current?.value || '', description: descriptionRef.current?.value || ''});
    } else {
      projectsContext.addProject({id: '', name: nameRef.current?.value || '', description: descriptionRef.current?.value || ''});
    }

    onClose();
  };

  return (
    <Popup title="Create project" width={600} onClose={onClose}>
      <CreateProjectContainer
        data-testid="CreateProject.container"
        onKeyDown={async (e) => {
          if (e.key === 'Enter') {
            await onSubmit();
          }
        }}
      >
        <Input
          ref={nameRef}
          isRequired
          inputKey="project-name"
          label="Name"
          placeholder="Project name"
          type="text"
          validated={validatedForm.name}
          onChange={() => { setValidatedForm({ ...validatedForm, name: validateStringInput(nameRef.current?.value || '') }); }}
          defaultValue={isEdit ? selectedProject?.name : undefined}
        />
        <TextArea
          ref={descriptionRef}
          isRequired
          inputKey="project-description"
          label="Description"
          placeholder="Project description"
          value=""
          validated={validatedForm.description}
          onChange={() => { setValidatedForm({ ...validatedForm, description: validateStringInput(descriptionRef.current?.value || '') }); }}
          defaultValue={isEdit ? selectedProject?.description : undefined}
        />

        <CreateProjectButtonContainer data-testid="CreateProject.button.container">
          <Button iconName="bi-floppy" onClick={onSubmit} text="Save" />
        </CreateProjectButtonContainer>
      </CreateProjectContainer>
    </Popup>
  );
};

export default CreateProjectPopup;
