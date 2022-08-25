import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";


const userReqDetail = (props) => {
  const { requests } = props;
  const userinfo = JSON.parse(window.localStorage.getItem('userInfo'));

  const isAdmin = userinfo.isAdmin;
  // const headrequestList = useSelector((state) => state.headrequestList);
  // const { loading, error, requests } = headrequestList;

  return (
    <>
      <section className="content-main" style={{ maxWidth: "1200px" }}>
          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
           
                   <table className="table border table-lg">
                    <thead>
                      <tr>
                        <th scope="col">Нэр</th>
                        <th scope="col">Харилцагч байгууллага</th>
                        <th scope="col">Дэд Ажил</th>
                        <th scope="col">Чухал байдал</th>
                        <th scope="col">Төлөвлөгөөт огноо</th>
                        <th scope="col">Хавсралт</th>
                        <th scope="col">Дэлгэрэнгүй</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {requests.map((request)=>{
                        <tr key={request.userReqID}>
                            <td>{request.name}</td>
                            <td>{request.organizationID}</td>
                            <td>{"0"}</td>
                            <td>{request.importanceID}</td>
                            <td>{request.planTime}</td>
                            <td>{request.file_id}</td>
                            <td>{request.description}</td>
                        </tr>
                      })}  */}
                    </tbody>
              </table>
                </div>
                </div>
              </section>
          </>
  );
};
  

export default userReqDetail;
