import Popup from "../../../../components/Popup/Popup.tsx";
import Input from "../../../../components/Input/Input.tsx";
import TextArea from "../../../../components/TextArea/TextArea.tsx";
import { useRef, useState } from "react";
import IconButton from "../../../../components/IconButton/IconButton.tsx";
import { validateInput } from "./validators.ts";
import styled from "styled-components";

const PopupButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 20px;
`;

type CreatePagePopupProps = {
  onClose: () => void;
};

const CreatePagePopup = (props: CreatePagePopupProps) => {
  const { onClose } = props;
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const [validatedForm, setValidatedForm] = useState({
    name: false,
    description: false,
  });

  return (
    <Popup title="Create project" width={600} onClose={onClose}>
      <Input
        ref={nameRef}
        isRequired
        inputKey="project-name"
        label="Name"
        placeholder="Project name"
        type="text"
        validated={validatedForm.name}
        onChange={() => setValidatedForm({ ...validatedForm, name: validateInput(nameRef.current?.value || "") })}
      />
      <TextArea
        ref={descriptionRef}
        isRequired
        inputKey="project-description"
        label="Description"
        placeholder="Project description"
        value=""
        validated={validatedForm.description}
        onChange={() => setValidatedForm({ ...validatedForm, description: validateInput(descriptionRef.current?.value || "") })}
      />

      <PopupButtonContainer>
        <IconButton iconName="Save" onClick={() => console.log(descriptionRef)} color="#747474" hoverColor="#393939" text="Save" />
      </PopupButtonContainer>
    </Popup>
  );
};

export default CreatePagePopup;
