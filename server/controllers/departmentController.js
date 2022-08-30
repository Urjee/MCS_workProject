const db = require('../models');
const Department = db.Department;
const { QueryTypes, Op } = require('sequelize');

exports.allDepartment = async(req, res) => {

    Department.findAll().then(depData => {
        res.send(depData);
    });

}

