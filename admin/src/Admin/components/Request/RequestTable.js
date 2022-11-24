import React from "react";
import { useHistory } from "react-router-dom";

const RequestTable = (props) => {
  const { requests } = props;
  const history = useHistory();

  const handleClick = (userReqID) => {
    setTimeout(() => history.push(`/requestEdit/?id=${userReqID}`));
  };
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Нэр</th>
          <th scope="col">Ажлын төрөл</th>
          <th scope="col">Төлөв</th>
          <th scope="col">Хавсралт</th>
          <th scope="col">Дэлгэрэнгүй</th>
          <th scope="col"> Байгууллага</th>
          <th>Үүсгэсэн огноо</th>
        </tr>
      </thead>
      <tbody>
      {/* {requests.length === 0 ? (
          <table className="alert alert-info text-center mt-3 form-control">
            Одоогоор дата байхгүй 
          </table>
        ) : ( 
          <> */}
        { requests.map((request) => (
          <tr key={request.userReqID}
            onClick={() => handleClick(request.userReqID)}>
            <td>{request.name}</td>
            <td>{request.importanceName}</td>
            <td>{request.stateName}</td>
            <td>{request?.file_name}</td>
            <td>{request.description}</td>
            <td>{request.organizationName}</td>
            <td>{request.createDate} </td>
          </tr>
          )) 
        }
        
      </tbody>

    </table>
  );
};
export default RequestTable;
