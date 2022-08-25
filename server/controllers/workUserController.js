const db = require('../models');
const WorkUser = db.WorkUser;
const Organization = db.Organization;

const { QueryTypes, Op } = require('sequelize');
const events = require('events');

exports.allWorkUsers = async(req, res) => {

    WorkUser.findAll().then(data => {
        res.send(data);
    });
}
exports.addWorkUser=async(req,res)=>{
    const {    
        name,
        organizationID,
        importance_id,
        planTime,
        file,
        } = req.body;
        
    const org_id = Organization.findByPk(organizationID);

    WorkUser.create({
        name: name,
        organizationID: org_id,
        importance_id: importance_id,
        planTime: planTime,
        file: file,
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: err });
    });
    
}

