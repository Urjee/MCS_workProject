const db = require('../models');
const Importance = db.Importance;
const { QueryTypes, Op } = require('sequelize');

exports.allImportance = async(req, res) => {

    Importance.findAll().then(data => {
        res.send(data);
    });

}

