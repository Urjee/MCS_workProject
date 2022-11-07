const db = require('../models');
const Work = db.Work;

const { QueryTypes, Op } = require('sequelize');

exports.allWorks = async(req, res) => {
    // const id = req.body;
    // db.sequelize.query(`
    // exec sp_userReqs 4, 0, ${id.headID}`,
    // {type: QueryTypes.SELECT })
    // .then(data => {
    //     res.send(data);
    // })
    Work.findAll().then(data => {
        res.send(data);
    });
}
    // db.sequelize.query(`
    // exec sp_works 1,0,0;`, { type: QueryTypes.SELECT }).then(data => {
    //     res.send(data);
    // });

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
