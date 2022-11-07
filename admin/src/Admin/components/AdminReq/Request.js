import React from "react";
import { Link } from "react-router-dom";

const Request = (props) => {
  const { works, comment } = props;
  let totalSale = 0;
  if (works) {
    works.map((work) =>
      work.isPaid === true ? (totalSale = totalSale + work.totalPrice) : null
    );
  }
  return (
    <div className="row">
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-primary">
              <i className="text-primary fas fa-usd-circle"></i>
            </span>
            <div className="text">
              <Link to="/requests" className="mb-1">
            <i className="material-icons md-plus"></i> Ирсэн хүсэлтүүд
          </Link>
          <br/>
              <span>{totalSale.toFixed(0)}</span>
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-success">
              <i className="text-success fas fa-bags-shopping"></i>
            </span>
            <div className="text">
            <Link to="/performedWork" className="mb-1">
            <i className="material-icons md-plus"></i> Гүйцэтгэсэн ажил
          </Link>
             <br/>
              {works ? <span>{works.length}</span> : <span>0</span>}
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-warning">
              <i className="text-warning fas fa-shopping-basket"></i>
            </span>
            <div className="text">
            <Link to="/comment" className="mb-1">
            <i className="material-icons md-plus"></i>Сэтгэгдэл
              </Link>
              <br/>
              {comment ? <span>{comment.length}</span> : <span>0</span>}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};


export default Request;
