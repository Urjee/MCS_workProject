const db = require('../models');
const WorkRequest = db.WorkRequest;
const { QueryTypes, Op } = require('sequelize');
const events = require('events');

exports.allWorkRequests = async(req, res) => {

    WorkRequest.findAll().then(data => {
        res.send(data);
    });

}

exports.addWorkRequest=async(req,res)=>{
    const {    
        name,
        organizationID,
        importanceID,
        planTime,
        subWorkID,
        file_id,
        description,
        } = req.body;

    WorkRequest.create({name:name, organizationID:organizationID, subWorkID:subWorkID, importanceID:importanceID,planTime:planTime, file_id:file_id, description:description })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: err });
    });
}
exports.addFile=async(req,res)=>{
    const {    
        file_name,
        original_name,
        file_path,
        } = req.body;

    WorkRequest.create({ file_name: file_name, original_name:original_name, file_path:file_path })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: err });
    });

    

}
