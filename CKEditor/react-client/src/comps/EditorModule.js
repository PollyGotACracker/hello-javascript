// https://ckeditor.com/ckeditor-5/online-builder/
// https://ckeditor.com/docs/ckeditor5/latest/installation/frameworks/react.html

import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";

export const EditorModule = (props) => {
  const { handler } = props;

  class imageUploadAdapter {
    constructor(loader) {
      // The file loader instance to use during the upload.
      this.loader = loader;
      this.url = "/upload";
    }

    // Starts the upload process.
    upload() {
      return this.loader.file.then(
        (file) =>
          new Promise((resolve, reject) => {
            this._initRequest();
            this._initListeners(resolve, reject, file);
            this._sendRequest(file);
          })
      );
    }

    // Aborts the upload process.
    abort() {
      if (this.xhr) {
        this.xhr.abort();
      }
    }

    // Initializes the XMLHttpRequest object using the URL passed to the constructor.
    _initRequest() {
      const xhr = (this.xhr = new XMLHttpRequest());

      // Note that your request may look different. It is up to you and your editor
      // integration to choose the right communication channel. This example uses
      // a POST request with JSON as a data structure but your configuration
      // could be different.
      xhr.open("POST", this.url, true);
      // application/x-www-form-urlencoded 가 아닐 경우 req.body가 빈 객체...
      xhr.setRequestHeader(
        "Content-type",
        "multipart/form-data; charset=utf-8"
      );
      xhr.responseType = "json";
    }

    // Initializes XMLHttpRequest listeners.
    _initListeners(resolve, reject, file) {
      const xhr = this.xhr;
      const loader = this.loader;
      const genericErrorText = `파일 업로드에 실패했습니다 : ${file.name}.`;

      xhr.addEventListener("error", () => reject(genericErrorText));
      xhr.addEventListener("abort", () => reject());
      xhr.addEventListener("load", () => {
        const response = xhr.response;
        console.log(response);

        // This example assumes the XHR server's "response" object will come with
        // an "error" which has its own "message" that can be passed to reject()
        // in the upload promise.
        //
        // Your integration may handle upload errors in a different way so make sure
        // it is done properly. The reject() function must be called when the upload fails.
        if (!response || response.error) {
          return reject(
            response && response.error
              ? response.error.message
              : genericErrorText
          );
        }

        // If the upload is successful, resolve the upload promise with an object containing
        // at least the "default" URL, pointing to the image on the server.
        // This URL will be used to display the image in the content. Learn more in the
        // UploadAdapter#upload documentation.
        resolve({
          default: response.url,
        });
      });

      // Upload progress when it is supported. The file loader has the #uploadTotal and #uploaded
      // properties which are used e.g. to display the upload progress bar in the editor
      // user interface.
      if (xhr.upload) {
        xhr.upload.addEventListener("progress", (evt) => {
          if (evt.lengthComputable) {
            loader.uploadTotal = evt.total;
            loader.uploaded = evt.loaded;
          }
        });
      }
    }

    // Prepares the data and sends the request.
    _sendRequest(file) {
      // Prepare the form data.
      const data = new FormData();
      data.append("upload", file);

      // Important note: This is the right place to implement security mechanisms
      // like authentication and CSRF protection. For instance, you can use
      // XMLHttpRequest.setRequestHeader() to set the request headers containing
      // the CSRF token generated earlier by your application.

      // Send the request.
      this.xhr.send(data);
    }
  }

  // function uploadAdapterPlugin(editor) {
  //   editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
  //     // Configure the URL to the upload script in your back-end here!
  //     return new imageUploadAdapter(loader);
  //   };
  // }

  // Editor.create(document.querySelector("#editor"), {
  //   extraPlugins: [uploadAdapterPlugin],
  // }).catch((error) => {
  //   console.log(error);
  // });

  return (
    <CKEditor
      editor={Editor}
      config={{
        simpleUpload: {
          // The URL that the images are uploaded to.
          uploadUrl: "/upload",

          // Enable the XMLHttpRequest.withCredentials property.
          withCredentials: true,

          // Headers sent along with the XMLHttpRequest to the upload server.
          headers: {
            "X-CSRF-TOKEN": "CSRF-Token",
            Authorization: "Bearer <JSON Web Token>",
          },
        },
      }}
      data="<p></p>"
      // onReady={(editor) => {
      //   editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      //     return new imageUploadAdapter(loader);
      //   };
      // }}
      onChange={handler}
      onBlur={handler}
      onFocus={(event, editor) => {
        console.log("Focus.", editor);
      }}
    />
  );
};

export default EditorModule;
