import { MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

type Props = {
  value: string;
};

const MDPreview = (props: Props) => {
  const {value} = props;
  return (
    <article data-color-mode='light'>
      <MdPreview
        modelValue={value}
        language='en-US'
        codeTheme='stackoverflow'/>
    </article>);
};

export default MDPreview;
