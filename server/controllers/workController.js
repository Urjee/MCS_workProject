const db = require('../models');
const Work = db.Work;

const { QueryTypes, Op } = require('sequelize');

exports.allWorks = async(req, res) => {

    Work.findAll().then(data => {
        res.send(data);
    });

}

exports.addWorkUser=async(req,res)=>{
    const {    
        name,
        organizationID,
        subWorkID,
        importance_id,
        planTime,
        file,
        } = req.body;

    WorkUser.create({name: name, organizationID:organizationID, subWorkID:subWorkID, importance_id:importance_id, planTime:planTime,file:file })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: err });
    });

    

}
