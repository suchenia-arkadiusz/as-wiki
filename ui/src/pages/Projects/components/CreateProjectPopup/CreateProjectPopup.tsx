import Popup from "../../../../components/Popup/Popup.tsx";
import Input from "../../../../components/Input/Input.tsx";
import TextArea from "../../../../components/TextArea/TextArea.tsx";
import { useRef, useState } from "react";
import Button from "../../../../components/Button/Button.tsx";
import styled from "styled-components";
import { validateStringInput } from "../../../../utils/validators.ts";

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
};

const CreateProjectPopup = (props: CreatePagePopupProps) => {
  const { onClose } = props;
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const [validatedForm, setValidatedForm] = useState({
    name: false,
    description: false,
  });

  return (
    <Popup title="Create project" width={600} onClose={onClose}>
      <CreateProjectContainer data-testid="CreateProject.container">
        <Input
          ref={nameRef}
          isRequired
          inputKey="project-name"
          label="Name"
          placeholder="Project name"
          type="text"
          validated={validatedForm.name}
          onChange={() => setValidatedForm({ ...validatedForm, name: validateStringInput(nameRef.current?.value || "") })}
        />
        <TextArea
          ref={descriptionRef}
          isRequired
          inputKey="project-description"
          label="Description"
          placeholder="Project description"
          value=""
          validated={validatedForm.description}
          onChange={() => setValidatedForm({ ...validatedForm, description: validateStringInput(descriptionRef.current?.value || "") })}
        />

        <CreateProjectButtonContainer data-testid="CreateProject.button.container">
          <Button iconName="bi-floppy" onClick={() => console.log(descriptionRef)} text="Save" />
        </CreateProjectButtonContainer>
      </CreateProjectContainer>
    </Popup>
  );
};

export default CreateProjectPopup;
