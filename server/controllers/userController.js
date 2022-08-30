const db = require('../models');
const User = db.User;
const { QueryTypes, Op } = require('sequelize');
const events = require('events');

exports.allUsers = async(req, res) => {
    // User.findAll().then(data => {
    //     res.send(data);
    // });
    db.sequelize.query(`
        exec sp_users 1,0,0;`, { type: QueryTypes.SELECT }).then(data => {
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
exports.listUser = async(req, res) => {
    const { id } = req.body;

    db.sequelize.query(`SELECT 
        departmentName 
        FROM
            [Departments] AS [Department] 

        INNER JOIN Organizations AS org 
        ON org.organizationID = [Department].organizationID
        WHERE
        Department.organizationID = ${id}`, {type: QueryTypes. SELECT }).then(depData => {
            res.send(depData);
        })
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
        departmentID,
        job,
        OrganizationID,
        } = req.body;

    if(phone.length > 0) {
        const phoneNumber = parseInt(phone);
    }

     const org = await db.Organization.findOne({ where: { organizationName: 'Coca Cola'  } });
     OrganizationID == 1;//org.OrganizationID;

    // const dept = await db.Department.findOne({ where: { departmentName } });
    // let departmentID = dept.departmentID;

    // const head = await User.findOne({ where: { username: headName } });
    // let headID = head.headID;

    User.create({ firstname: firstname, lastname: lastname, email:email, phoneNumber:phone, departmentID: departmentID, job:job,  OrganizationID: OrganizationID })
    .then(data => {
        res.send(data);
        console.log(data)
    })

    .catch(err => {
        res.status(500).send({ message: err });
    });


}