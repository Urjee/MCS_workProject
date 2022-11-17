const db = require('../models');
const { QueryTypes } = require('sequelize');

exports.allDeveloper = async(req, res) => {
    db.sequelize.query(`
        SELECT usrs.UserID, usrs. firstname
        From Users usrs
        WHERE usrs.isAdmin = 1`,
        { type: QueryTypes.SELECT }
        )
        .then(userData => {
        res.send(userData);
    });
}
exports.dev = async(req, res) => {
    db.sequelize.query(`
    SELECT usrs.*
    From Users usrs
    WHERE usrs.firstname = '${req.body.name}' and usrs.isAdmin = 1 `,
    { type: QueryTypes.SELECT }
    )
    .then(userData => {
    res.send(userData);
})
}