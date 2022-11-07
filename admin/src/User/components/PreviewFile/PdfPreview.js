import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import FileViewer from "react-file-viewer";
import { StyledDiv, StyledSpan, StyledButton } from "./StyledComponents";

const PdfPreview = ({ file }) => {
  // const [numPages]
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);

  // With page navigations
  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  // With page navigations
  function previousPage() {
    changePage(-1);
  }

  // // With page navigations
  function nextPage() {
    changePage(+1);
  }
  // With page navigations
  const [renderNavButtons, setRenderNavButtons] = React.useState(false);

  // With page navigations
  function onSuccess() {
    alert("PDF document loaded successfully!");
    setPageNumber(1);
    setRenderNavButtons(true);
  }
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    // With page navigations
    setRenderNavButtons(true);
    onSuccess();
  }
  console.log("file", file);
  return <FileViewer fileType={"pdf"} filePath={file} />;
};
export default PdfPreview;
