const db = require('../models');
const Request = db.Request;

const { QueryTypes, Op } = require('sequelize');

exports.allRequests = async(req, res) => {

    Request.findAll().then(data => {
        res.send(data);
    });

}
exports.headRequests=async(req, res)=>{
    const organizationID=req.body.organizationID;
    const UserID=req.body.UserID;
    const head={
        organizationID:organizationID,
        UserID:UserID,
    };
}

exports.adminRequests=async(req, res)=>{
    Request.findAll().then(data=>{
        res.send(data);
    });
}

