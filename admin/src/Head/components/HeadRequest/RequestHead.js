import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const RequestHead = (props) => {
  const { headReqs } = props;  
  const dispatch = useDispatch();
console.log(headReqs);
  useEffect(() => {
    dispatch(fetch)
  })
  return (
      <table className="table" >
          <thead>
            <tr>
              <th scope="col">Нэр</th>
              <th scope="col">Дэд Ажил</th>
              <th scope="col">Чухал байдал</th>
              <th scope="col">Төлөв</th>
              <th scope="col">Хавсралт</th>
              <th scope="col">Дэлгэрэнгүй</th>
              <th scope="col" className="text-end">
                Үйлдэл
              </th>
            </tr>
          </thead>
           <tbody>
            {headReqs.map((headReq)=>(
              <tr key={headReq.userReqID}>
                <td>{headReq.name}</td>
                <Link><td>{headReq.subWorkID}0</td></Link>
                <td>{headReq.importanceName}</td>
                <td>{headReq?.stateName}</td>
                <td>{headReq?.file_name}</td>
                <td>{headReq.description}</td>
                <td className="text-end">
                <div className="dropdown">
                  <Link to="#"data-bs-toggle="dropdown"
                    className="btn btn-light">
                    <i className="fas fa-ellipsis-h"></i>
                  </Link>
                  <div className="dropdown-menu">
                  <Link className="dropdown-item" to={`/headReqDetail/?id=${headReq.userReqID}&name=${headReq.stateName}`}
                    > Засах
                  </Link>
                  </div>
                </div>
                </td>
              </tr>
            ))}
           </tbody>
      </table>
  );
};

export default RequestHead;



