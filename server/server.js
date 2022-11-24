const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models/index");
const bodyParser = require("body-parser");
const multer = require("multer");
const axios = require("axios");
const cookiesMiddleware = require('universal-cookie-express');

global.__baseDir = __dirname;
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookiesMiddleware())
// app.use(serverMiddleware);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images", file.originalname);

  },
  filename: (req, file, cb) => {
    cb(null, Buffer.from(file.originalname, 'latin1').toString('utf-8'));
  },
});
//zurag GET ashiglaj download hiih
app.use(express.static("images"));
app.use("/images", express.static(__dirname + "/images"));

const upload = multer({ storage: storage });

app.post("/api/addUserReq", upload.array("file", 10), async (req, res) => {
  const today = new Date();
  let createdate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let currentTime = today.getHours() + ":" + today.getMinutes() +":" + today.getSeconds();
  let reqID;

  const imprts = await db.Importance.findOne({
    where: { importanceName: req.body.importanceName },
  });
  let importanceID = imprts.importanceID;

  if(importanceID == '3'){
  const request = await db.UserReq.create({
    name: req.body.name,
    createDate: createdate + " " + currentTime,
    importanceID: importanceID,
    description: req.body.description,
    UserID: req.body.userID,
    organizationID: req.body.organizationID,
    stateID: 1,
  });
  if (request) {
    reqID = request.userReqID;
    axios.post("http://172.16.226.57:8080/api/message", {
      email: req.body.email,
      phone: req.body.phone,
      userReqID: reqID,
    });
  }
  } else {
    const request = await db.UserReq.create({
      name: req.body.name,
      createDate: createdate + " " + currentTime,
      importanceID: importanceID,
      description: req.body.description,
      UserID: req.body.userID,
      organizationID: req.body.organizationID,
      stateID: 3,
    });
    if (request) {
      reqID = request.userReqID;
      axios.post("http://172.16.226.57:8080/api/message", {
        email: req.body.email,
        phone: req.body.phone,
        userReqID: reqID,
      });
    }
  }
  

  for (let i = 0; i < req.files.length; i++) {
    const files = await db.File.findAll({
      where: { file_name: req.files[i].filename },
    });
    let file_name = files.file_name;
    await db.sequelize
      .query(`insert into [dbo].Files (file_name, original_name, file_path, userReqID)
            Values ( N'${req.files[i].filename}', N'${req.files[i].originalname}', N'${req.files[i].path}', ${reqID})`);
  }
  for (let i = 0; i < req.files.length; i++) {
    await db.sequelize.query(`
          UPDATE [dbo].UserReqs
          SET file_id = files.file_id
          FROM [dbo].UserReqs users
          LEFT JOIN [dbo].Files files
          ON users.userReqID = files.userReqID
          WHERE users.userReqID = ${reqID}`);
  }
});
app.post(
  "/api/headAddReqUpdate",
  upload.array("file", 10),
  async (req, res) => {
    let reqID;
    const imprts = await db.Importance.findOne({
      where: { importanceName: req.body.importanceName },
    });
    const user = await db.User.findOne({ where: { UserID: req.body.userID } });
    const today = new Date();
    let createdate =
      today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
    let currentTime = today.getHours() + ":" + today.getMinutes() +  ":" + today.getSeconds();
    const request = await db.UserReq.create({
      name: req.body.name,
      createDate: createdate + " " + currentTime,
      importanceID: imprts.importanceID,
      description: req.body.description,
      UserID: req.body.userID,
      organizationID: user.organizationID,
      stateID: 3,
    });
    if (request) {
      reqID = request.userReqID;
      axios.post("http://172.16.226.57:8080/api/message", {
        email: req.body.email,
        phone: req.body.phone,
        userReqID: reqID,
      });
    }
    for (let i = 0; i < req.files.length; i++) {
      const files = await db.File.findAll({
        where: { file_name: req.files[i].filename },
      });
      let file_name = files.file_name;
      await db.sequelize
        .query(`insert into [dbo].Files (file_name, original_name, file_path, userReqID)
            Values ( N'${req.files[i].filename}', N'${req.files[i].originalname}', N'${req.files[i].path}', ${reqID})`);
    }

    for (let i = 0; i < req.files.length; i++) {
      await db.sequelize.query(`
          UPDATE [dbo].UserReqs
          SET file_id = files.file_id
          FROM [dbo].UserReqs users
          LEFT JOIN [dbo].Files files
          ON users.userReqID = files.userReqID
          WHERE users.userReqID = ${reqID}`);
    }
  }
);
app.put("/api/requestUpdate", async (req, res) => {
  const reqID = req.body.userReqID;
  const devID = await db.sequelize.query(`SELECT usrs.*
  From Users usrs
 WHERE usrs.firstname = N'${req.body.firstname}' and usrs.isAdmin = 1`);
  try {
    const update = await db.sequelize.query(`
            UPDATE 
              [dbo].UserReqs
            SET
              planTime = '${req.body.planTime}',
              realTime = '${req.body.realTime}',
              startDate = '${req.body.startDate}',
              endDate = '${req.body.endDate}',
              stateID = ${req.body.stateID},
              DeveloperID = ${devID[0][0].UserID},
              percentOfPerform = ${req.body.percentOfPerform}
            WHERE
              [dbo].UserReqs.userReqID = ${reqID}`);

    if (update.length > 0) {
      res.status(200).send(update);
    } else {
      res.status(204).send(update);
    }
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});
app.put("/api/requestAdminUpdate", upload.array("file", 10), async (req, res) => {
  const reqID = req.body.userReqID;
  const devID = await db.sequelize.query(`SELECT usrs.*
  From Users usrs
 WHERE usrs.firstname = N'${req.body.firstname}' and usrs.isAdmin = 1`);
 const states = await db.State.findOne({
  where: {
    stateName: req.body.stateName,
  },
});
let stateID = states.stateID;
  try {
    const update = await db.sequelize.query(`
            UPDATE 
              [dbo].UserReqs
            SET
              planTime = '${req.body.planTime}',
              realTime = '${req.body.realTime}',
              startDate = '${req.body.startDate}',
              endDate = '${req.body.endDate}',
              stateID = ${stateID},
              DeveloperID = ${devID[0][0].UserID},
              percentOfPerform = ${req.body.percentOfPerform}
            WHERE
              [dbo].UserReqs.userReqID = ${reqID}`);

    if (update.length > 0) {
      res.status(200).send(update);
    } else {
      res.status(204).send(update);
    }
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
  for (let i = 0; i < req.files.length; i++) {
    const files = await db.File.findAll({
      where: { file_name: req.files[i].filename },
    });
    let file_name = files.file_name;
    await db.sequelize
      .query(`insert into [dbo].Files (file_name, original_name, file_path, userReqID)
            Values ( N'${req.files[i].filename}', N'${req.files[i].originalname}', N'${req.files[i].path}', ${reqID})`);
  }
  for (let i = 0; i < req.files.length; i++) {
    await db.sequelize.query(`
          UPDATE [dbo].UserReqs
          SET file_id = files.file_id
          FROM [dbo].UserReqs users
          LEFT JOIN [dbo].Files files
          ON users.userReqID = files.userReqID
          WHERE users.userReqID = ${reqID}`);
  }
});


app.post("/api/headUEdit", async (req, res) => {
  const deps = await db.Department.findOne({
    where: { departmentName: req.body.departmentName },
  });
  let departmentID = deps.departmentID;
  const uID = req.body.UserID;
  await db.User.update(
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      job: req.body.job,
      departmentID: departmentID,
      isActive: req.body.isActive,
    },
    {
      where: {
        UserID: uID,
      },
    }
  );
});
app.put("/api/userEdit", async (req, res) => {
  const org = await db.Organization.findOne({ where: { organizationName: req.body.organizationName }});
  let organizationID = org.organizationID;
  const uID = req.body.UserID;

  const dep = await db.Department.findOne({ where: { departmentName: req.body.departmentName }});
  let departmentID = dep.departmentID;

  const active = await db.User.findOne({ where: { isActive: req.body.isActive }});
  let isActive = active?.isActive;

  const head = await db.User.findOne({ where: {firstname: req.body.headName}});
  let headID = head?.UserID;
  
  const update = await db.User.update(
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      job: req.body.job,
      departmentID: departmentID,
      organizationID: organizationID,
      headID: headID,
      isActive: isActive,
      isAdmin: req.body.isAdmin,
    },
    {
      where: {
        UserID: uID,
      },
    }
  );

  if (update) {
    res.status(200).send(update);
  } else {
    res.status(422).json({ message: "Input error" });
  }
});
app.post("/api/uploads", async (req, res) => {
  const reqID = req.body.userReqID;
  await db.UserReq.update(
    {
      name: req.body.name,
    },
    {
      where: {
        UserReqID: reqID,
      },
    }
  );
});
app.post('/api/settingsUpdate', async (req, res) => {
  const uID = req.body.UserID;
    await db.User.update({ 
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      confirmPassword:req.body.confirmPassword 
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
  }    
);
app.post("/api/userReqsUpdate", upload.array("file", 10), async (req, res) => {
  const reqID = req.body.userReqID;
  const imprts = await db.Importance.findOne({
    where: { importanceName: req.body.importanceName },
  });
  let importanceID = imprts.importanceID;
  await db.UserReq.update(
    {
      name: req.body.name,
      description: req.body.description,
      importanceID: importanceID,
    },
    {
      where: {
        UserReqID: reqID,
      },
    }
  );
  for (let i = 0; i < req.files.length; i++) {
    const files = await db.File.findAll({
      where: { file_name: req.files[i].filename },
    });
    let file_name = files.file_name;
    await db.sequelize
      .query(`insert into [dbo].Files (file_name, original_name, file_path, userReqID)
                Values ( N'${req.files[i].filename}', N'${req.files[i].originalname}', N'${req.files[i].path}', ${reqID})`);
  }

  for (let i = 0; i < req.files.length; i++) {
    await db.sequelize.query(`
              UPDATE [dbo].UserReqs
              SET file_id = files.file_id
              FROM [dbo].UserReqs users
              LEFT JOIN [dbo].Files files
              ON users.userReqID = files.userReqID
              WHERE users.userReqID = ${reqID}`);
  }
});
//Sequelize
db.sequelize.sync().then(() => {
  console.log("Connected to DB.");
});
app.get("/", (req, res) => {
  res.json({ message: "App connected." });
});

// API
require("./routes/user")(app);
require("./routes/userReq")(app);
require("./routes/organization")(app);
require("./routes/department")(app);
require("./routes/importance")(app);
require("./routes/state")(app);
require("./routes/developer")(app);
require("./routes/head")(app);
require("./routes/file")(app);

const PORT = 8080;
app.listen(PORT, "0.0.0.0");

console.log("App listening on port", PORT);
