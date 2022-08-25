const db = require('../models');
const Organization = db.Organization;
const { QueryTypes, Op } = require('sequelize');

exports.allOrganization = async(req, res) => {

    Organization.findAll().then(data => {
        res.send(data);
    });

}

