import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
const RequestTable = (props) => {
  const { userReqs }=props;
  const history = useHistory();
  const handleClick = (userReqID) => {
    setTimeout(() => history.push(`/reqDetails/?id=${userReqID}`))
}
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetch)
  })
      return (
      <table className="table" >
          <thead>
              <th scope="col">Нэр</th>
              {/* <th scope="col">Дэд Ажил</th> */}
              <th scope="col">Ажлын төрөл</th>
              <th scope="col">Төлөв</th>
              <th scope="col">Үүсгэсэн огноо</th>
              <th scope="col">Хавсралт</th>
              <th scope="col">Дэлгэрэнгүй</th>
          </thead>
          <tbody>
            {userReqs.map((request)=>(
          <tr key={request.userReqID} onClick={() => handleClick(request.userReqID)}>
                <td>{request.name}</td>
                {/* <Link><td>{request.subWorkID}0</td></Link> */}
                <td>{request.importanceName}</td>
                <td>{request?.stateName}</td>
                <td>{request?.createDate}</td>
                <td>{request?.file_name}</td>
                <td>{request.description}</td>
              </tr>
            ))}
          </tbody>
      </table>
  );
};

export default RequestTable;



