// https://ckeditor.com/ckeditor-5/online-builder/
// https://ckeditor.com/docs/ckeditor5/latest/installation/frameworks/react.html

import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import uploadAdapter from "../modules/uploadAdapter";

export const EditorModule = (props) => {
  const { className, name, onChangeHandler } = props;

  return (
    <CKEditor
      className={className}
      name={name}
      editor={Editor}
      config={Editor.defaultConfig}
      data="<p></p>"
      onReady={(editor) => {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
          return new uploadAdapter(loader);
        };
      }}
      onChange={onChangeHandler}
      onBlur={(event, editor) => {
        console.log("Blur.", editor);
      }}
      onFocus={(event, editor) => {
        console.log("Focus.", editor);
      }}
    />
  );
};

export default EditorModule;
