// https://ckeditor.com/ckeditor-5/online-builder/
// https://ckeditor.com/docs/ckeditor5/latest/installation/frameworks/react.html

import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";

export const EditorModule = ({ data, handler, b_code }) => {
  const BACKEND_URI = "http://localhost:3000";

  // UploadAdapter Interface 를 implement 하여 CustomAdapter 구현
  class imageUploadAdapter {
    constructor(loader) {
      // 업로드 시 사용될 file loader 객체 인스턴스 생성
      this.loader = loader;
      this.path = "/upload";
      // application 이 build 되었을 경우 사용 가능
    }

    // 업로드 method
    upload() {
      return this.loader.file.then(
        (file) =>
          // Promise 객체 생성(pending; 비동기 처리가 수행되지 않은 상태)
          // 콜백 함수 내에서 비동기 처리
          // 콜백 함수는 resolve, reject 함수를 인수로 받아서 처리 성공 또는 실패 시 각각 호출
          new Promise((resolve, reject) => {
            this._initRequest();
            this._initListeners(resolve, reject, file);
            this._sendRequest(file);
          })
      );
    }

    // 업로드 중단 method
    abort() {
      if (this.xhr) {
        this.xhr.abort();
      }
    }

    // XMLHttpRequest 객체(XHR) 생성 method
    _initRequest() {
      const xhr = (this.xhr = new XMLHttpRequest());
      xhr.open("POST", this.path, true);
      xhr.responseType = "json";
    }

    // XMLHttpRequest 리스너 초기화 method
    _initListeners(resolve, reject, file) {
      const xhr = this.xhr;
      const loader = this.loader;
      const genericErrorText = `파일 업로드에 실패했습니다 : ${file.name}.`;

      xhr.addEventListener("error", () => reject(genericErrorText));
      xhr.addEventListener("abort", () => reject());
      xhr.addEventListener("load", () => {
        const response = xhr.response;

        // response 객체의 값이 없거나 error 를 포함할 경우
        // Promise.reject 실행(rejected;업로드 실패)
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
        // 위의 if 문에 걸리지 않으면 Promise.resolve 실행(fulfilled;업로드 성공)
        // response 가 보낸 url 을 img tag 의 src 에 삽입
        // /static 은 NodeJS 의 app.js 에서 설정한 /public 폴더
        resolve({
          default: `${BACKEND_URI}/static/uploads/${response.url}`,
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

    // 데이터 생성 및 request 요청 method
    _sendRequest(file) {
      const data = new FormData();
      data.append("upload", file);
      data.append("bcode", b_code);

      // Important note: This is the right place to implement security mechanisms
      // like authentication and CSRF protection. For instance, you can use
      // XMLHttpRequest.setRequestHeader() to set the request headers containing
      // the CSRF token generated earlier by your application.

      this.xhr.send(data);
    }
  }

  // mediaEmbed: 미디어(영상) 링크 embed 하여 게시글 저장 시 oembed 대신 iframe tag 로 저장
  return (
    <CKEditor
      editor={Editor}
      config={{
        mediaEmbed: {
          previewsInData: true,
        },
      }}
      data="<p></p>"
      onReady={(editor) => {
        // adapter plugin
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
          return new imageUploadAdapter(loader);
        };
        // 게시글 수정 시 editor 에 게시글 data(context 의 postData.b_content) setting
        editor.setData(data);
      }}
      onChange={handler}
      onBlur={handler}
      onFocus={(event, editor) => {
        console.log("Focus.", editor);
      }}
    />
  );
};

export default EditorModule;
