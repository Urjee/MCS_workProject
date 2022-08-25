const db = require('../models');
const User = db.User;
const { QueryTypes, Op } = require('sequelize');
const events = require('events');

exports.allUsers = async(req, res) => {

    db.sequelize.query(`
    SELECT [UserID],
           [username],
           [password],
           [firstname],
           [lastname],
           [phone],
           [department],
           [job],
           [email],
           [isAdmin],
           [organizationID],
           [headID],
        (
           SELECT organizationName FROM
            [Organizations] AS org
            WHERE org.organizationID = [User].organizationID
        )
        AS organizationName
    FROM [Users] AS [User];`, { type: QueryTypes.SELECT }).then(data => {
        res.send(data);
    });

}

exports.register = async(req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    const user = {
        email: email,
        password: password,
    };

    User.create(user).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({ message: err });
    });

}

exports.login = async(req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    
    User.findOne({ where: { email: `${email}`, password: `${password}` } }).then(data => {
        if(email == null || email == "") {
            res.status(400).json({ message: `User not found`});
        } else if(password == "" || password == null) {
            res.status(422).json({ message: "Password incorrect"});
        } else {
            res.status(200).send(data);
        }
    }).catch(err => {
        res.status(500).json({ message: err.message});
    });
};

exports.addUser=async(req,res)=>{
    const {    
        firstname,
        lastname,
        email,
        phone,
        department,
        job,
        organizationName,
        } = req.body;

    if(phone.length > 0) {
        const phoneNumber = parseInt(phone);
    }

    User.create({ firstname: firstname, lastname: lastname, email:email, phoneNumber:phone, department:department, job:job,  organizationName:organizationName })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({ message: err });
    });

    

}
