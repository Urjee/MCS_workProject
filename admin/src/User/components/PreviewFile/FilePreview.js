import React, { useEffect, useMemo, useState } from "react";
import { FILE_TYPE } from "./FileTypes";
import PdfPreview from "./PdfPreview";
import SheetPreview from "./SheetPreview";
import DocumentPreview from "./DocumentPreview";
import FilePreviewModal from "./FilePreviewModal";
import { StyledDiv } from "./StyledComponents";

const FilePreview = ({ file, onClose }) => {
  const [inputFile, setInputFile] = useState();

  useEffect(() => {
    console.log(file);

    if (file) {
      switch (file.type) {
        case FILE_TYPE.IMAGE.IPHONE_HEIC:
        case FILE_TYPE.IMAGE.IPHONE_HEIF:
        case FILE_TYPE.IMAGE.IPHONE_HEIC_SEQUENCE:
        case FILE_TYPE.IMAGE.IPHONE_HEIF_SEQUENCE:
        case FILE_TYPE.IMAGE.GIF:
        case FILE_TYPE.IMAGE.JPEG:
        case FILE_TYPE.IMAGE.PNG:
        case FILE_TYPE.IMAGE.SVG:
          setInputFile({
            imageFile: URL.createObjectURL(file),
            pdfFile: null,
            wordFile: null,
            sheetFile: null
          });
          break;

        case FILE_TYPE.PDF:
          setInputFile({
            pdfFile: URL.createObjectURL(file),
            imageFile: null,
            wordFile: null,
            sheetFile: null
          });
          break;

        case FILE_TYPE.MS_OFFICE.WORD:
        case FILE_TYPE.MS_OFFICE.WORD_XML:
          setInputFile({
            wordFile: URL.createObjectURL(file),
            pdfFile: null,
            imageFile: null,
            sheetFile: null
          });
          break;

        case FILE_TYPE.CSV:
        case FILE_TYPE.MS_OFFICE.EXCEL:
        case FILE_TYPE.MS_OFFICE.EXCEL_XML:
          setInputFile({
            sheetFile: file,
            pdfFile: null,
            imageFile: null,
            wordFile: null
          });
          break;

        default:
          setInputFile({
            imageFile: null,
            pdfFile: null,
            sheetFile: null,
            wordFile: null
          });
          break;
      }
    }
  }, [file]);

  const RenderPreview = useMemo(() => {
    if (inputFile?.imageFile) {
      return (
        <FilePreviewModal onClose={onClose}>
          <StyledDiv className="render-image">
            <img src={inputFile.imageFile} alt={inputFile.imageFile} />
          </StyledDiv>
        </FilePreviewModal>
      );
    } else if (inputFile?.pdfFile) {
      return (
        <FilePreviewModal onClose={onClose}>
          <StyledDiv className="render-pdf">
            <PdfPreview file={inputFile.pdfFile} />
          </StyledDiv>
        </FilePreviewModal>
      );
    } else if (inputFile?.sheetFile) {
      return (
        <FilePreviewModal onClose={onClose}>
          <StyledDiv className="render-sheet">
            <SheetPreview file={inputFile.sheetFile} />
          </StyledDiv>
        </FilePreviewModal>
      );
    } else if (inputFile?.wordFile) {
      return (
        <FilePreviewModal onClose={onClose}>
          <StyledDiv className="render-document">
            <DocumentPreview file={inputFile.wordFile} />
            {/* <iframe
              title="Preview doc file"
              className={"application/msword"}
              width="100%"
              height="600"
              frameBorder="0"
              src={`https://docs.google.com/gview?url=${inputFile.wordFile}&embedded=true`}
            ></iframe> */}
          </StyledDiv>
        </FilePreviewModal>
      );
    } else {
      return (
        <FilePreviewModal onClose={onClose}>
          <StyledDiv>No Preview</StyledDiv>
        </FilePreviewModal>
      );
    }
  }, [inputFile, onClose]);

  return <StyledDiv>{RenderPreview}</StyledDiv>;
};
export default FilePreview;
