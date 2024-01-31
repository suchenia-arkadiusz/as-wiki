import Popup from "../../../../components/Popup/Popup.tsx";
import Input from "../../../../components/Input/Input.tsx";
import TextArea from "../../../../components/TextArea/TextArea.tsx";
import { useRef, useState } from "react";
import Button from "../../../../components/Button/Button.tsx";
import styled from "styled-components";
import { validateStringInput } from "../../../../utils/validators.ts";
import { useRestApiContext } from "../../../../contexts/RestApiContext.tsx";
import { useToasterContext } from "../../../../contexts/ToasterContext.tsx";
import { useProjectsContext } from "../../../../contexts/ProjectsContext.tsx";

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
  const api = useRestApiContext();
  const toasterContext = useToasterContext();
  const projectsContext = useProjectsContext();

  const [validatedForm, setValidatedForm] = useState({
    name: false,
    description: false,
  });

  const onSubmit = async () => {
    const body = {
      name: nameRef.current?.value || "",
      description: descriptionRef.current?.value || "",
    };

    const response = await api.post("/api/v1/projects", body);

    if (response.status !== 200) {
      toasterContext.addToast("Something went wrong!", "ERROR");
    }

    if (response.status === 200) {
      projectsContext.addProject(await response.json());
      toasterContext.addToast("Project created successfully!", "SUCCESS");
    }

    onClose();
  };

  return (
    <Popup title="Create project" width={600} onClose={onClose}>
      <CreateProjectContainer
        data-testid="CreateProject.container"
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
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
          <Button iconName="bi-floppy" onClick={onSubmit} text="Save" />
        </CreateProjectButtonContainer>
      </CreateProjectContainer>
    </Popup>
  );
};

export default CreateProjectPopup;
