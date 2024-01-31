import Popup from "../../../../components/Popup/Popup.tsx";
import { Page } from "../../../../types.ts";
import styled from "styled-components";
import Button from "../../../../components/Button/Button.tsx";
import { useRestApiContext } from "../../../../contexts/RestApiContext.tsx";
import { useRef, useState } from "react";
import { useToasterContext } from "../../../../contexts/ToasterContext.tsx";
import { usePageListContext } from "../../../../contexts/PageListContext.tsx";
import Input from "../../../../components/Input/Input.tsx";
import { validateStringInput } from "../../../../utils/validators.ts";

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
};

const CreatePagePopup = (props: CreatePagePopupProps) => {
  const { onClose, selectedPage } = props;
  const nameRef = useRef<HTMLInputElement>(null);
  const api = useRestApiContext();
  const toasterContext = useToasterContext();
  const pageListContext = usePageListContext();

  const [validatedName, setValidatedName] = useState<boolean>(false);
  const onSubmit = async () => {
    const projectId = location.pathname.split("/")[2];
    const body = {
      name: nameRef.current?.value || "",
      parentId: selectedPage?.id || undefined,
    };

    const response = await api.post(`/api/v1/projects/${projectId}/pages`, body);

    if (response.status !== 200) {
      toasterContext.addToast("Something went wrong!", "ERROR");
    }

    if (response.status === 200) {
      pageListContext.fetchPages();
      toasterContext.addToast("Page created successfully!", "SUCCESS");
    }

    onClose();
  };

  return (
    <Popup title="Create Page" width={600} onClose={onClose}>
      <CreatePageContainer data-testid="CreatePage.container">
        <Input
          ref={nameRef}
          isRequired
          inputKey="page-name"
          label="Name"
          placeholder="Page name"
          type="text"
          validated={validatedName}
          onChange={() => setValidatedName(nameRef.current ? validateStringInput(nameRef.current.value) : false)}
        />
        <CreatePageButtonContainer data-testid="CreatePage.button.container">
          <Button iconName="bi-floppy" onClick={onSubmit} text="Save" />
        </CreatePageButtonContainer>
      </CreatePageContainer>
    </Popup>
  );
};

export default CreatePagePopup;
