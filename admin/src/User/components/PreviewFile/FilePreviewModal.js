import * as React from "react";
import { StyledDiv, StyledButton } from "./StyledComponents";

export default function FilePreviewModal(props) {
  const { onClose, children } = props;
  return (
    <StyledDiv className="modalBackground">
      <StyledDiv className="modalContainer">
        <StyledDiv className="modalTitleCloseBtn">
          <StyledButton className="modalTitleCloseBtnX" onClick={onClose}>
            X
          </StyledButton>
        </StyledDiv>
        <StyledDiv className="modalBody">{children}</StyledDiv>
      </StyledDiv>
    </StyledDiv>
  );
}
