'use client';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const CKEditorComponent = ({ value, onChange }) => {

  return (
    <div className="ck-editor-wrapper [&_.ck-editor__editable]:max-h-[300px]">
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
};

export default CKEditorComponent;
