import React from "react";
import { useHistory } from "react-router-dom";

const ReqAdmin = (props) => {
  const { requests } = props;
  const history = useHistory();

  console.log(requests);
  const handleClick = (userReqID) => {
    setTimeout(() => history.push(`/reqAdminEdit/?id=${userReqID}`));
  };
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Нэр</th>
          {/* <th scope="col">Дэд ажил</th> */}
          <th scope="col">Байгууллага</th>
          <th scope="col">Чухал байдал</th>
          <th scope="col">Төлөв</th>
          <th scope="col">Үүсгэсэн огноо</th>
          <th scope="col">Төлөвлөгөөт хугацаа</th>
          <th scope="col">Бодит цаг</th>
          <th scope="col">Эхэлсэн огноо</th>
          <th scope="col">Дуусах огноо</th>
          <th scope="col">Гүйцэтгэгч</th>
          <th scope="col">Хавсралт</th>
          <th scope="col">Тайлбар</th>
          <th scope="col">Ажлын гүйцэтгэл</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((request) => (
          <tr
            key={request.userReqID}
            onClick={() => handleClick(request.userReqID)}
          >
            <td>{request.name}</td>
            <td>{request.organizationName}</td>
            <td>{request.importanceName}</td>
            <td>{request.stateName}</td>
            <td>{request.createDate}</td>
            <td>
              {(request.planTime).replace("T", " ")}
            </td>
            <td>{request.realTime}</td>
            <td>
              {(request.startDate)
                .replace("T", " ")}
            </td>
            <td>{(request.endDate)
                .replace("T", " ")}
            </td>
            <td>{request.firstname}</td>
            <td>{request.file_name}</td>
            <td>{request.description}</td>
            <td>{request.percentOfPerform}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReqAdmin;
