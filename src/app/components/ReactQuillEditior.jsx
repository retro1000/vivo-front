import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Grid } from '@mui/material';

const ReactQuillEditior = ({editorHtml, setEditorHtml, placeholder, label, error, helperText}) => {

  const handleChange = (html) => {
    setEditorHtml(html);
  };

  return (
    <Grid>
      <ReactQuill
        style={{minHeight: '100px', borderRadius: '5px'}}
        theme="snow"
        placeholder={placeholder}
        value={editorHtml}
        onChange={handleChange}
        modules={{
          toolbar: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            [{size: []}],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'},
             {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image', 'video'],
            ['clean']
          ]
        }}
      />
    </Grid>
  );
}

export default ReactQuillEditior;
