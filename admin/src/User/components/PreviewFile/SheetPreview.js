import React, { useEffect, useState } from "react";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import { StyledDiv } from "./StyledComponents";

const SheetPreview = ({ file }) => {
  const [data, setData] = useState({ cols: [], rows: [] });
  useEffect(() => {
    ExcelRenderer(file, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        setData({
          cols: resp.cols,
          rows: resp.rows
        });
      }
    });
  }, [file]);
  return (
    <StyledDiv className="sheetPreview">
      <OutTable
        data={data.rows}
        columns={data.cols}
        tableClassName="SheetTable"
        tableHeaderRowClass="heading"
      />
    </StyledDiv>
  );
};
export default SheetPreview;
