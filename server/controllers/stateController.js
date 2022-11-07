const db = require('../models');
const State = db.State;
const { QueryTypes, Op } = require('sequelize');

exports.allState = async(req, res) => {

    State.findAll().then(impData => {
        res.send(impData);
    });

}

