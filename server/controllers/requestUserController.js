const db = require('../models');
const RequestUser = db.RequestUser;

const { QueryTypes, Op } = require('sequelize');

exports.allUserRequests = async(req, res) => {

    RequestUser.findAll().then(data => {
        res.send(data);
    });

}

