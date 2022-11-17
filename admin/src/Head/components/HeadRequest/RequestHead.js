import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const RequestHead = (props) => {
  const { headReqs } = props;
  const dispatch = useDispatch();

  const history = useHistory();

  const handleClick = (userReqID, stateName) => {
    setTimeout(() =>
      history.push(`/headReqDetail/?id=${userReqID}&name=${stateName}`)
    );
  };

  useEffect(() => {
    dispatch(fetch);
  });
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Нэр</th>
          {/* <th scope="col">Дэд Ажил</th> */}
          <th scope="col">Чухал байдал</th>
          <th scope="col">Төлөв</th>
          <th scope="col">Хавсралт</th>
          <th scope="col">Дэлгэрэнгүй</th>
        </tr>
      </thead>
      <tbody>
        {headReqs.map((headReq) => (
          <tr
            key={headReq.userReqID}
            onClick={() => handleClick(headReq.userReqID, headReq.stateName)}
          >
            <td>{headReq.name}</td>
            {/* <Link><td>{headReq.subWorkID}0</td></Link> */}
            <td>{headReq.importanceName}</td>
            <td>{headReq?.stateName}</td>
            <td>{headReq?.file_name}</td>
            <td>{headReq.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RequestHead;
