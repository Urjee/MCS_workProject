import * as React from "react";
import FileViewer from "react-file-viewer";

const DocumentPreview = ({ file }) => {
  const onError = (e) => {
    console.log(e, "error in file-viewer");
  };
  return <FileViewer fileType={"docx"} filePath={file} onError={onError} />;
  // return (
  //   <iframe
  //     // src={
  //     //   "https://docs.google.com/viewer?url=" +
  //     //   file +
  //     //   "&embedded=true#toolbar=0"
  //     // }
  //     src={`${file}#toolbar=0`}
  //     title="docViewer"
  //     type="application/msword"
  //     width="100%"
  //     height="100%"
  //     style={{ overflow: "auto" }}
  //   ></iframe>
  // );
};
export default DocumentPreview;
