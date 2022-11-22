import React from "react";
import { useHistory } from "react-router-dom";

const TableReport = (props) => {
  const { requests }=props;
  const history = useHistory();

  const handleClick = (userReqID) => {
       setTimeout(() => history.push(`/headReportDetail/?id=${userReqID}`))
  }
  return (
      <table className="table">
        <thead>
          <tr>
            <th>Ажлын нэр</th>
            <th scope="col">Харилцагч</th>
            <th scope="col">Үүсгэсэн огноо</th>
            <th scope="col">Эхлэх хугацаа</th>
            <th scope="col">Дуусах хугацаа</th>
            <th scope="col">Ажлын төрөл</th>
            <th scope="col">Байгууллага</th>
            <th scope="col">Төлөв</th>
            <th scope="col">Бодит цаг</th>
            <th scope="col">Гүйцэтгэгч</th>
          </tr>
        </thead>
        <tbody>
          
          {requests.map((request)=>(
            <tr key={request.userReqID} onClick={() => handleClick(request.userReqID)}>
              <td>{request?.name}</td>
              <td>{request.firstname}</td>
              <td>{request.createDate}</td>
              <td>{request.startDate}</td>
              <td>{request.endDate}</td>
              <td>{request.importanceName}</td>
              <td>{request.organizationName}</td>
              <td>{request.stateName}</td>
              <td>{request.realTime}</td>
              <td>{request.userrname}</td>
            </tr>
          ))}
        </tbody>
      </table>

  );
};

export default TableReport;





