import styled from 'styled-components';
import { MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

const EditorContainer = styled.div`
  height: 800px;
`;

type Props = {
  value: string;
  onChange: (_value: string) => void;
  onImageUpload?: (_images: File[]) => Promise<string[]>;
};

const MDEditor = (props: Props) => {
  const {value, onChange, onImageUpload} = props;

  const handleOnImageUpload = async (files: File[], callback: (_urls: string[]) => void) => {
    if (!onImageUpload) return;

    const urls = await onImageUpload(files);
    callback(urls);
  };

  return (
    <EditorContainer data-testid='MDEditor.container'>
      <MdEditor
        data-testid='MDEditor.editor'
        showCodeRowNumber={true}
        footers={[]}
        toolbarsExclude={['save', 'prettier', 'pageFullscreen', 'fullscreen', 'htmlPreview', 'catalog', 'github']}
        editorId='page-content-editor'
        codeTheme='stackoverfloew'
        language='en-US'
        modelValue={value}
        onChange={onChange}
        preview={false}
        onUploadImg={handleOnImageUpload}
      />
    </EditorContainer>
  );
};

export default MDEditor;
