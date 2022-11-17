import React, { useEffect, useState } from "react";
import TopTotal from "./TopTotal";
import StateStatistic from "./StateStatistic";
import Comment from "./Comment";
import CommentMain from "./CommentMain";
const Main = () => {
  const isAdmin = window.localStorage.isAdmin;

  const [data, setData] = useState([]);

  useEffect(async () => {
    const res = await fetch(
      "http://172.16.226.57:8080/api/totalOrganization"
    ).then((res) => res.json());

    let a = 0;

    for(let i = 0; i < res.length; i++) {
      a += res[i].value;
    }
    for(let i = 0; i < res.length; i++) {
      res[i].value = parseFloat(((res[i].value / a) * 100).toString().slice(0, 5));
    }
    setData(res);
  }, []);

  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title"> Мэдээ мэдээлэл </h2>
        </div>
        {isAdmin!= '2' ?
        <div className="row">
          <div className="col-xl-8 col-lg-10">
            <div className="card mb-8 shadow-sm">
              <article className="card-body">
                <h5 className="card-title">Байгууллагын ажил даалгавар</h5>
                <TopTotal data={data} />
              </article>
            </div>
          </div>
          <div className="col-xl-4 col-lg-12">
            <div className="card mb-6 shadow-sm">
              <article className="card-body">
                <h5 className="card-title">Ажил даалгаврын төлөв</h5>
                <StateStatistic />
              </article>
            </div>
          </div>
        </div>
        : 
        <div className="card mb-8 shadow-sm">
              <article className="card-body">
                <h5 className="card-title">Сэтгэгдэл</h5>
                <CommentMain />
              </article>
            </div>}
      </section>
    </>
  );
};

export default Main;
