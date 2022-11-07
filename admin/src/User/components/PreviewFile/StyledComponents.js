import styled from "styled-components";

export const StyledDiv = styled.div`
  &.modalBackground {
    width: 100%;
    height: 100%;
    position: fixed;
    display: -ms-flexbox;
    display: inline-grid;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    // margin-left: 158x
  }

  &.modalContainer {
    width: calc(100% - 200px);
    height: calc(100% - 100px);
    border-radius: 12px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display: flex;
    flex-direction: column;
    padding: 25px;
  }

  &.modalTitleCloseBtn {
    display: flex;
    justify-content: flex-end;
  }

  &.modalBody {
    overflow: scroll;
    flex: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.7rem;
    text-align: center;
  }

  &.input-wrapper {
    border: 1px solid;
    padding: 6px;
    width: 40%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: space-evenly;
  }

  &.render-image {
    height: -webkit-fill-available;
  }

  &.render-pdf {
    height: -webkit-fill-available;
  }

  &.render-sheet {
    height: -webkit-fill-available;
  }

  &.render-document {
    height: -webkit-fill-available;
  }

  &.sheetPreview {
    & > div > table {
      &.SheetTable {
        border: 1px solid #b0cbef;
        border-width: 1px 0 0 1px;
        font-size: 11pt;
        font-family: Calibri;
        font-weight: 100;
        border-spacing: 0;
        border-collapse: collapse;
        padding: 10px;
        border-radius: 3px;
      }

      &.SheetTable th {
        background-color: #b0cbef;
        font-weight: 700;
        font-size: 14px;
        border: 1px solid #9eb6ce;
        border-width: 0 1px 1px 0;
        height: 17px;
        line-height: 17px;
      }
      &.SheetTable td {
        border: 1px solid #9eb6ce;
        border-width: 0 1px 1px 0;
      }
    }
  }
`;

export const StyledInput = styled.input``;

export const StyledButton = styled.button`
  &.modalTitleCloseBtnX {
    background-color: transparent;
    border: none;
    font-size: 25px;
    cursor: pointer;
  }
`;

export const StyledImg = styled.img``;

export const StyledSpan = styled.span`
  &.pdfPageNumbers {
    font-size: medium;
  }
`;
