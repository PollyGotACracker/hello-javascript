// https://ckeditor.com/ckeditor-5/online-builder/
// https://ckeditor.com/docs/ckeditor5/latest/installation/frameworks/react.html

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export const EditorModule = () => {
  return (
    <div className="editor">
      <CKEditor
        editor={ClassicEditor}
        data="<p></p>"
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          // console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          // console.log({ event, editor, data });
        }}
        onBlur={(event, editor) => {
          // console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          // console.log("Focus.", editor);
        }}
      />
    </div>
  );
};

export default EditorModule;
