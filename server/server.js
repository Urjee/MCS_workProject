const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./models/index')
const bodyParser = require('body-parser');
const multer  = require('multer');
const UserReq = require('./models/UserReq');
const user = require('./routes/user');
const axios = require('axios');

global.__baseDir = __dirname;
app.use(cors({
  origin: "*"
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'images', file.originalname)
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname)
  }
});
//zurag GET ashiglaj download hiih
app.use(express.static('images'));
app.use('/images',  express.static(__dirname + '/images'));

const upload = multer({ storage: storage });
const download = multer( {storage: storage});
app.post('/api/createUserReq', upload.array('file', 10) , async (req, res) => {
  let reqID;
  const imprts = await db.Importance.findOne({ where: { importanceName: req.body.importanceName} });
        let importanceID = imprts.importanceID;
  const today = new Date();
  let createdate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        const request = await db.UserReq.create({
            name: req.body.name, 
            createDate: createdate,
            importanceID: importanceID, 
            description: req.body.description,
            UserID: req.body.userID,
            organizationID: user.organizationID,
            stateID: 1,
          })
          .then(data => {
            res.send(data);
            reqID = data.userReqID;
          })
        let userReqID;
        if(request){
          axios.post('http://172.16.226.57:8080/api/message', {
            firstname: req.body.firstname,
              phone: req.body.phone,
              userReqID: userReqID, 
            })}  

        for(let i = 0; i < req.files.length; i++) {
        const files = await db.File.findAll({ where: { file_name: req.files[i].filename} });
        let file_name = files.file_name;
            await db.sequelize.query(`insert into [dbo].Files (file_name, original_name, file_path, userReqID)
            Values ( N'${req.files[i].filename}', N'${req.files[i].originalname}', N'${req.files[i].path}', ${reqID})`)
        };
        for(let i = 0; i < req.files.length; i++){
          await db.sequelize.query(`
          UPDATE [dbo].UserReqs
          SET file_id = files.file_id
          FROM [dbo].UserReqs users
          LEFT JOIN [dbo].Files files
          ON users.userReqID = files.userReqID
          WHERE users.userReqID = ${reqID}`);
        };   
});
app.post('/api/headAddReqUpdate', upload.array('file', 10) , async (req, res) => {
  let reqID;
  const imprts = await db.Importance.findOne({ where: { importanceName: req.body.importanceName} });
        let importanceID = imprts.importanceID;
  // const imprts = await db.sequelize.query(`SELECT *
  //       From [dbo].[Importance]
  //     WHERE [dbo].[Importance].importanceName= N'${req.body.importanceName}'`)
  const user = await db.User.findOne({ where: { UserID: req.body.userID }});
  const today = new Date();
  let createdate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
       const request = await db.UserReq.update({
            name: req.body.name, 
            createDate: createdate,
            importanceID: imprts.importanceID, 
            description: req.body.description,
            UserID: req.body.userID,
            organizationID: user.organizationID,
            stateID: 3,
          })
        .then(data => {
            res.send(data);
            reqID = data.userReqID;
        })
        let userReqID;
        // userReqID = request.userReqID;
        if(request){
          axios.post('http://172.16.226.57:8080/api/message', {
            firstname: req.body.firstname,
              phone: req.body.phone,
              userReqID: userReqID, 
            }
          )
    }     
        for(let i = 0; i < req.files.length; i++) {
          
        const files = await db.File.findAll({ where: { file_name: req.files[i].filename} });
        let file_name = files.file_name;
            await db.sequelize.query(`insert into [dbo].Files (file_name, original_name, file_path, userReqID)
            Values ( N'${req.files[i].filename}', N'${req.files[i].originalname}', N'${req.files[i].path}', ${reqID})`)
        };

        for(let i = 0; i < req.files.length; i++){
          await db.sequelize.query(`
          UPDATE [dbo].UserReqs
          SET file_id = files.file_id
          FROM [dbo].UserReqs users
          LEFT JOIN [dbo].Files files
          ON users.userReqID = files.userReqID
          WHERE users.userReqID = ${reqID}`);
        };   
        
});
// app.put('/api/headReqDetail', async (req, res) => {
//   const imprts = await db.Importance.findOne({where: { importanceName: req.body.importanceName } });
//       let importanceID = imprts.importanceID; 
//         const reqID = req.body.userReqID;
//          await db.UserReq.update({ 
//             name: req.body.name, 
//             description: req.body.description,
//             importanceID: importanceID
//           }, {
//             where: {
//               UserReqID: reqID,
//             }
//           })
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({ message: err });
//         });

//       // for(let i = 0; i < req.files.length; i++) {

//       //     if(req.files.length > 1) {

//       //       await db.sequelize.query(`insert into [dbo].Files (file_name, original_name, file_path, userReqID)
//       //       Values ( N'${req.files[i].filename}', N'${req.files[i].originalname}', N'${req.files[i].path}', ${reqID} })`)

//       //     } else (req.files.length === 1) 

//       //       await db.sequelize.query(`
//       //         insert into [dbo].Files (
//       //             file_name, 
//       //             original_name,
//       //             file_path,
//       //             userReqID)
//       //           Values (N'${req.files[0].filename}',
//       //                   N'${req.files[0].originalname}',
//       //                   N'${req.files[0].path}', 
//       //                   ${reqID})`)           
//       //     }
//         }    
// );
app.post('/api/requestUpdate',upload.array('file', 10) , async( req, res) => {
      const reqID = req.body.userReqID
      const dev = await db.User.findOne({ where: { firstname: req.body.firstname } });
        let devID = dev.UserID;
      
      try {
          const update = await db.sequelize.query(`
            UPDATE 
              [dbo].UserReqs
            SET
              planTime = '${new Date(req.body.planTime).toISOString().slice(0, 23).replace('T', ' ')}',
              realTime = '${req.body.realTime}',
              startDate = '${new Date(req.body.startDate).toISOString().slice(0, 23).replace('T', ' ')}',
              endDate = '${new Date(req.body.endDate).toISOString().slice(0, 23).replace('T', ' ')}',
              stateID = ${req.body.stateID},
              DeveloperID = ${devID},
              percentOfPerform = ${req.body.percentOfPerform}
            WHERE
              [dbo].UserReqs.userReqID = ${reqID}`
            );

          if(update.length > 0) {
            res.status(200).send(update);
          } else {
            res.status(204).send(update);
          };
        }
       catch(err) {
        res.status(500).json({
          message: err
        });
      }
  } );
app.put('/api/requestAdminUpdate', async( req, res) => {
  const reqID = req.body.userReqID
  const realTime = req.body.realTime;
  const states = await db.State.findOne({
    where: {
      stateName: req.body.stateName } });
      let stateID = states.stateID; 
  const devID = await db.sequelize.query(`SELECT usrs.*
   From Users usrs
  WHERE usrs.firstname = N'${req.body.firstname}' and usrs.isAdmin = 1`)
  try {
    const update = await db.sequelize.query(`
      UPDATE 
        [dbo].UserReqs
      SET
        planTime = '${new Date(req.body.planTime).toISOString().slice(0, 23).replace('T', ' ')}',
        realTime = '${realTime}',
        startDate = '${new Date(req.body.startDate).toISOString().slice(0, 23).replace('T', ' ')}',
        endDate = '${new Date(req.body.endDate).toISOString().slice(0, 23).replace('T', ' ')}',
        DeveloperID = ${devID[0][0].UserID},
        stateID = ${stateID},
        percentOfPerform = ${req.body.percentOfPerform}
      WHERE
        [dbo].UserReqs.userReqID = ${reqID}`
    );

    if(update.length > 0) {
      res.status(200).send(update);
    } else {
      res.status(204).send(update);
    };
  } catch(err) {
    res.status(500).json({
      message: err
    });
  }
} );
app.post('/api/headUEdit' , async (req, res) => {
  const deps = await db.Department.findOne({ where: { departmentName: req.body.departmentName } });
        let departmentID = deps.departmentID;
  // const active = await db.sequelize.query(`SELECT * FROM [dbo].Users
  //   WHERE [dbo].Users.isActive = ${req.body.activeName}`)
  // const active = await db.User.findOne({ where: { isActive: req.body.activeName}});
      // let activeID = active.isActive;

  const uID = req.body.UserID;
        const userUpdate = await db.User.update({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          phone: req.body.phone,
          job: req.body.job,
          departmentID: departmentID,
          isActive: req.body.isActive,
          // organizationID: organizationID,
          // headID: head.UserID,
          // admin: req.body.admin,
        },{
          where: {
            UserID: uID,
          }
        }).then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({ message: err });
      });
      console.log(userUpdate)
      });
app.post('/api/userEdit', async( req, res) => {

  const org = await db.Organization.findOne({ where: { organizationName: req.body.organizationName} });
        let organizationID = org.organizationID;
  const dep = await db.Department.findOne({ where: { departmentName: req.body.departmentName} });
        let departmentID = dep.departmentID;
  // const head = await db.User.findOne({ where: { firstname: req.body.headd }});
  //       let headID = head?.UserID;
  // const active = req.body.isActive;
  // const active = await db.User.findOne({ where: { activeName: req.body.activeName }});
  //       let activeID = active?.isActive;
  // const active = await db.sequelize.query(`SELECT * FROM [dbo].Users 
  //        WHERE [dbo].Users.isActive = N'${req.body.activeName}'`)
  //        let activeID = active.isActive;

  const active = await db.User.findOne({ where: { isActive: req.body.isActive} });
        let isActive = active?.isActive;
        const uID = req.body.UserID;
        const userEdit = await db.User.update(
          { 
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone,
            job: req.body.job,
            departmentID: departmentID,
            organizationID: organizationID,
            // headID: headID,
            isActive: isActive,
            isAdmin: req.body.isAdmin,
          }, {
            where: {
              UserID: uID,
            }
          })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err });
        });
        console.log(userEdit);
      });
// app.put('/api/userReqUpdate',async (req, res) => {
//       const imprts = await db.Importance.findOne({ where: { importanceName: req.body.importanceName} });
//             let importanceID = imprts.importanceID;
//       const reqID;
//           const requestUpdate = await db.UserReq.create({ 
//                 name: req.body.name, 
//                 importanceID: importanceID, 
//                 description: req.body.description,

//               }, {
//                 where: {
//                   UserReqID: reqID,
//                 }
//               }).then(data => {
//                 res.send(data);
//             })
//             .catch(err => {
//                 res.status(500).send({ message: err });
//             });
//             console.log(requestUpdate)
//         });
app.post('/api/uploads', async (req, res) => {
        const reqID = req.body.userReqID;
          await db.UserReq.update({ 
            name: req.body.name 
          }, {
            where: {
              UserReqID: reqID,
            }
          })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err });
        });

      // for(let i = 0; i < req.files.length; i++) {

      //     if(req.files.length > 1) {

      //       await db.sequelize.query(`insert into [dbo].Files (file_name, original_name, file_path, userReqID)
      //       Values ( N'${req.files[i].filename}', N'${req.files[i].originalname}', N'${req.files[i].path}', ${reqID} })`)

      //     } else (req.files.length === 1) 

      //       await db.sequelize.query(`
      //         insert into [dbo].Files (
      //             file_name, 
      //             original_name,
      //             file_path,
      //             userReqID)
      //           Values (N'${req.files[0].filename}',
      //                   N'${req.files[0].originalname}',
      //                   N'${req.files[0].path}', 
      //                   ${reqID})`)           
      //     }
        }    
);
app.post('/api/userReqsUpdate', async (req, res) => {
  const reqID = req.body.userReqID;
  const imprts = await db.Importance.findOne({ where: { importanceName: req.body.importanceName} });
        let importanceID = imprts.importanceID;
  const update = await db.UserReq.update({
            name: req.body.name, 
            description: req.body.description,
            importanceID: importanceID

          }, {
            where: {
              UserReqID: reqID,
            }
          })
          .then(data => {
            res.send(data);
          })
          console.log(update);
  
});
//Sequelize
db.sequelize.sync().then(() => {
  console.log('Connected to DB.');
});
app.get("/", (req, res) => {
  res.json({ message: "App connected." });
});
// API
require('./routes/user')(app);
require('./routes/userReq')(app);
require('./routes/organization')(app);
require('./routes/department')(app);
require('./routes/importance')(app);
require('./routes/state')(app);
require('./routes/developer')(app);
require('./routes/head')(app);
require('./routes/file')(app);

const PORT = 8080;
app.listen(PORT, "0.0.0.0");

console.log('App listening on port', PORT)
