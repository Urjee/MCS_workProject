const db = require('../models');
const UserReq = db.UserReq;
const Req = db.Request;

const { QueryTypes, Op } = require('sequelize');
const events = require('events');

exports.allProducts = async(req, res) => {

    UserReq.findAll().then(data => {
        res.send(data);
        console.log(data)
    });

    // const data = await db.sequelize.query(`exec Mcs_workprogress.dbo.sp_work_list 1, ${userid}, ${headid}`, { type: QueryTypes.SELECT });

    // try {
    //     if(data != 0) {
    //         res.status(200).send(data);
    //         console.log(data)
    //     } else {
    //         res.status(404).json({ message: "Couldn't find data." });
    //         return;
    //     }
    // } catch(err) {
    //     res.status(500).json({ message: err.message });
    //     return;
    // };

}

exports.allProductsuser = async(req, res) => {

    UserReq.findAll().then(data => {
        res.send(data);
        console.log(data)
    });

    // const data = await db.sequelize.query(`exec Mcs_workprogress.dbo.sp_work_list 1, ${userid}, ${headid}`, { type: QueryTypes.SELECT });

    // try {
    //     if(data != 0) {
    //         res.status(200).send(data);
    //         console.log(data)
    //     } else {
    //         res.status(404).json({ message: "Couldn't find data." });
    //         return;
    //     }
    // } catch(err) {
    //     res.status(500).json({ message: err.message });
    //     return;
    // };

}

exports.addUserReq=async(req,res)=>{
    const {    
        name,
        organizationID,
        importanceID,
        planTime,
        file_id,
        stateID,
        description,
        } = req.body;

    UserReq.create({ name: name, organizationID:organizationID, importanceID: importanceID, planTime: planTime, file_id: file_id,description: description, stateID: stateID })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: err });
    });
}    

exports.userReqApproved = async(req, res) => {

    const { name, description, planTime, organizationID, file_id, importanceID, UserID, userReqID } = req.body;

    const userReq = await UserReq.update({
        stateID: 2
    },
    { where: {
        [Op.not]: { userReqID: null }       
        } 
    });

    if(userReq.stateID === 2) {
        const reqCreate = await Req.create({ name: name, description: description, planTime: planTime, stateID: 2, file_id: file_id, organizationID: organizationID, UserID: UserID, importanceID: importanceID, userReqID: userReqID })

        if(reqCreate) {
            res.status(200).send(reqCreate)
        } else {
            res.status(400).send({ message: "Unable to create" });
        };
    };

};

exports.getAdminReqs = async(req, res) => {

    const requests = await Req.findAll();

    if(requests) {
        res.status(200).send(requests);
    } else {
        res.status(400).send({ message: "Unable to find requests" });
    };

};

exports.workRequestClose = async(req, res) => {

    const { stateID, userReqID } = req.body;

    const requests = await Req.update({ stateID: stateID }, { where: { userReqID: userReqID } });

    if(requests) {
        await UserReq.update({ stateID: stateID }, { where: { userReqID: userReqID } });
    }

};