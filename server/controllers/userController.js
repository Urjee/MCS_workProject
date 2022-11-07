const db = require('../models');
const User = db.User;
const { QueryTypes, Op } = require('sequelize');
const events = require('events');

exports.allUsers = async(req, res) => {
    const id = req.body
    db.sequelize.query(`
    exec sp_users 1,0,0 ;`,

    // exec sp_users 1,0,${id.organizationID} ;`,
        { type: QueryTypes.SELECT })
        .then(data => {
        res.send(data);
    });
}
exports.headUser = async(req, res) => {
    const UserID = req.body.UserID;
    await db.sequelize.query(`
        exec sp_users 2,${UserID},0`,
        { type: QueryTypes.SELECT })
        .then(data => {
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
        Department.organizationID = ${id}`, 
        {type: QueryTypes. SELECT })
        .then(depData => {
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
//head User nemeh hiih uyed
exports.addUser = async(req, res)=>{
    const head = await db.User.findOne({
        where: {
            UserID: req.body.UserID
        }
    });
    const user = await db.User.create({
        password: "0000",
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        job: req.body.job,
        email: req.body.email,
        isAdmin: 2,
        organizationID: head.organizationID,
        headID: req.body.UserID,
        departmentID: req.body.departmentID,
        isActive: 1,

        });

        if(user) {
        res.status(200).send(user)
        } else {
        res.status(422).json({
            message: 'Please check your input'
        });
        };
    };

exports.adminCreateUser=async(req,res)=>{
    const {    
        firstname,lastname, email, phone, departmentName, job, organizationName, headd, admin, jobTitleName
        } = req.body;

        const org = await db.Organization.findOne({ where: { organizationName: organizationName  } });
        let OrganizationID = org.organizationID;

        const dept = await db.Department.findOne({ where: { departmentName: departmentName} });
        let departmentID = dept.departmentID;

        const head = await db.User.findOne({ where: { firstname: headd } });

        // const jobTitl = await db.User.findOne({ where: { jobTitleName: jobTitleName}});
        // let jobTitle = jobTitl.jobTitle;

    //     const jobTitl = await db.sequelize.query(`SELECT usrs.*
    //     From Users usrs
    //    WHERE usrs.firstname = N'${req.body.firstname}' and usrs.isAdmin = 1`)
        const u = await db.User.create({ 
            password: "0000",
            firstname: firstname,
            lastname: lastname, 
            email:email, 
            phone:phone,
            departmentID: departmentID, 
            job:job, 
            organizationID: OrganizationID , 
            headID: head?.UserID, 
            isAdmin: admin,
            isActive: 1,
            jobTitle: jobTitleName,
            })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({ message: err });
            });
        }
exports.userDetails = async(req, res)=> {
    const id = req.body;
    await db.sequelize.query(
        `exec sp_users 5,${id.UserID},0`,
            {type: QueryTypes.SELECT })
            .then(data => {
            res.send(data);
        });
    };
exports.headUserDetails = async(req, res)=> {
    const id = req.body;
    await db.sequelize.query(
        `exec sp_users 6,${id.UserID},0`,
            {type: QueryTypes.SELECT })
            .then(data => {
            res.send(data);
        });
    };
exports.deleteUser = async(res, req) =>{
    const id = req.body
    db.sequelize.query(`
        DELETE 
		FROM Users 
		WHERE UserID =${id.UserID}
        A` , 
        { type: QueryTypes.DELETE })
        .then(data => {
            res.send(data);
        });
}
