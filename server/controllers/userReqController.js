const db = require("../models");
const UserReq = db.UserReq;
const Req = db.Request;
const multer = require("multer");
const axios = require("axios");

const { QueryTypes, Op } = require("sequelize");
const events = require("events");

exports.allUserReq = async (req, res) => {
  const id = req.body;
  db.sequelize
    .query(
      `
        exec sp_userReqs 3,0, ${id.UserID} `,
      { type: QueryTypes.SELECT }
    )
    .then((data) => {
      res.send(data);
    });
};
exports.headReqDetail = async (req, res) => {
  const id = req.body;
  await db.sequelize
    .query(`exec sp_userReqs 2, ${id.userReqID}, 0`, {
      type: QueryTypes.SELECT,
    })
    .then((data) => {
      res.send(data);
    });
};
exports.requestEdit = async (req, res) => {
  const id = req.body;
  await db.sequelize
    .query(`exec sp_userReqs 8, ${id.userReqID}, 0`)
    .then((data) => {
      res.send(data);
    });
};
exports.editRequest = async (req, res) => {
  const id = req.body;
  await db.sequelize
    .query(`exec sp_userReqs 8, ${id.userReqID}, 0`, {
      type: QueryTypes.SELECT,
    })
    .then((data) => {
      res.send(data);
    });
};
exports.reqAdminEdit = async (req, res) => {
  const id = req.body;
  await db.sequelize
    .query(`exec sp_userReqs 9, ${id.userReqID}, 0`)
    .then((data) => {
      res.send(data);
    });
};

exports.message = async (req, res) => {
  const id = req.body;
  const msg = await db.sequelize.query(`exec sp_users 7, 0, ${id.userReqID}`, {
    type: QueryTypes.SELECT,
  });

  if (msg) {
    for (let i = 0; i < msg.length; i++) {
      axios.post("http://66.181.175.237:8080/api2/data/smsregister", {
        number: msg[i].phone,
        text: `[Ajliin huseltiin web], Hereglechiin mail: ${id.email}, Utasnii dugaar: ${id.phone}`,
      });
    }

    res.status(200).json({
      message: "SMS sent",
    });
  } else {
    res.status(422).json({
      message: "SMS failed",
    });
  }
};

exports.adminReqs = async (req, res) => {
  await db.sequelize
    .query(
      `
    SELECT 
        uReqs.[userReqID]
        ,uReqs.[name]
        ,uReqs.[organizationID]
        ,uReqs.[subWorkID]
        ,uReqs.[importanceID]
        ,uReqs.[file_id]
        ,uReqs.[description]
        ,uReqs.[stateID]
        ,uReqs.[UserID]
        ,uReqs.[startDate]
        ,uReqs.[endDate]
        ,uReqs.[createDate]
        ,uReqs.[DeveloperID]
        ,left( ureqs.realTime,8) realTime
        ,uReqs.[planTime]
        ,uReqs.[percentOfPerform],
        imprts.importanceName AS importanceName,
        stta.stateName AS stateName,
        usr.firstname AS firstname,
        org.organizationName AS organizationName,
        fle.file_name AS file_name
    FROM [dbo].UserReqs AS uReqs
        INNER JOIN Importance AS imprts
        ON imprts.importanceID = uReqs.importanceID
        INNER JOIN States AS stta
        ON stta.stateID = uReqs.stateID
        INNER JOIN Users usr
        ON usr.UserID = uReqs.DeveloperID
        INNER JOIN Organizations org
        ON org.organizationID = uReqs.organizationID
        LEFT JOIN Files fle
        ON fle.file_id = uReqs.file_id
    WHERE uReqs.stateID >=3  AND uReqs.importanceID = 1`,
      {
        type: QueryTypes.SELECT,
      }
    )
    .then((data) => {
      res.send(data);
    });
};
exports.adminReqsPro = async (req, res) => {
  await db.sequelize
    .query(
      `
    SELECT 
        uReqs.[userReqID]
        ,uReqs.[name]
        ,uReqs.[organizationID]
        ,uReqs.[subWorkID]
        ,uReqs.[importanceID]
        ,uReqs.[file_id]
        ,uReqs.[description]
        ,uReqs.[stateID]
        ,uReqs.[UserID]
        ,uReqs.[startDate]
        ,uReqs.[endDate]
        ,uReqs.[createDate]
        ,uReqs.[DeveloperID]
        ,left( ureqs.realTime,8) realTime
        ,uReqs.[planTime]
        ,uReqs.[percentOfPerform],
        imprts.importanceName AS importanceName,
        stta.stateName AS stateName,
        usr.firstname AS firstname,
        org.organizationName AS organizationName,
        fle.file_name AS file_name
    FROM [dbo].UserReqs AS uReqs
        INNER JOIN Importance AS imprts
        ON imprts.importanceID = uReqs.importanceID
        INNER JOIN States AS stta
        ON stta.stateID = uReqs.stateID
        INNER JOIN Users usr
        ON usr.UserID = uReqs.DeveloperID
        INNER JOIN Organizations org
        ON org.organizationID = uReqs.organizationID
        LEFT JOIN Files fle
        ON fle.file_id = uReqs.file_id
    WHERE uReqs.stateID >=3 AND uReqs.importanceID>1`,
      {
        type: QueryTypes.SELECT,
      }
    )
    .then((data) => {
      res.send(data);
    });
};
exports.allRequests = async (req, res) => {
  await db.sequelize
    .query(
      `
      SELECT uReqs.*,
        imprts.importanceName AS importanceName,
        stta.stateName AS stateName,
        fle.file_name AS file_name,
        org.organizationName AS organizationName,
		usr.phone as phone
    FROM [dbo].UserReqs AS uReqs
        INNER JOIN Importance AS imprts
        ON imprts.importanceID = uReqs.importanceID
        INNER JOIN States AS stta
        ON stta.stateID = uReqs.stateID
		INNER JOIN Users AS usr
		ON usr.UserID = uReqs.UserID
        LEFT JOIN Files fle
        ON uReqs.file_id = fle.file_id
        INNER JOIN Organizations org
        ON org.organizationID = uReqs.organizationID
    WHERE uReqs.stateID <= 3 AND uReqs.importanceID = 1`,
      {
        type: QueryTypes.SELECT,
      }
    )
    .then((data) => {
      res.send(data);
    });
};
exports.requestAll = async (req, res) => {
  await db.sequelize
    .query(
      `
    SELECT uReqs.*,
        imprts.importanceName AS importanceName,
        stta.stateName AS stateName,
        fle.file_name AS file_name,
        org.organizationName AS organizationName
    FROM [dbo].UserReqs AS uReqs
        INNER JOIN Importance AS imprts
        ON imprts.importanceID = uReqs.importanceID
        INNER JOIN States AS stta
        ON stta.stateID = uReqs.stateID
        LEFT JOIN Files fle
        ON uReqs.file_id = fle.file_id
        INNER JOIN Organizations org
        ON org.organizationID = uReqs.organizationID
    WHERE imprts.importanceID>=3 and stta.stateID<=3`,
      {
        type: QueryTypes.SELECT,
      }
    )
    .then((data) => {
      res.send(data);
    });
};
exports.deleteAdminReq = async (req, res) => {
  const id = req.body;
  db.sequelize
    .query(
      `
        DELETE 
		FROM UserReqs 
		WHERE userReqID =${id.userReqID}`,
      { type: QueryTypes.DELETE }
    )
    .then((data) => {
      res.send(data);
    });
};
exports.report = async (req, res) => {
  await db.sequelize
    .query(
      `
    SELECT uReqs.*,
    imprts.importanceName AS importanceName,
    stta.stateName AS stateName,
    fle.file_name AS file_name,
    users.firstname as firstname,
    usr.firstname as userrname,
    org.organizationName AS organizationName
FROM [dbo].UserReqs AS uReqs
    INNER JOIN Importance AS imprts
    ON imprts.importanceID = uReqs.importanceID
    INNER JOIN States AS stta
    ON stta.stateID = uReqs.stateID
    INNER JOIN Files fle
    ON uReqs.file_id = fle.file_id
    LEFT JOIN Organizations org
    ON org.organizationID = uReqs.organizationID
    INNER JOIN Users users
    ON users.UserID = uReqs.UserID 
    INNER JOIN Users usr
    ON usr.UserID = uReqs.DeveloperID
WHERE uReqs.stateID>=5 AND uReqs.importanceID = 1 `,
      {
        type: QueryTypes.SELECT,
      }
    )
    .then((data) => {
      res.send(data);
    });
};
exports.reports = async (req, res) => {
  await db.sequelize
    .query(
      `
    SELECT uReqs.*,
    imprts.importanceName AS importanceName,
    stta.stateName AS stateName,
    fle.file_name AS file_name,
    users.firstname as firstname,
    usr.firstname as userrname,
    org.organizationName AS organizationName
FROM [dbo].UserReqs AS uReqs
    INNER JOIN Importance AS imprts
    ON imprts.importanceID = uReqs.importanceID
    INNER JOIN States AS stta
    ON stta.stateID = uReqs.stateID
    LEFT JOIN Files fle
    ON uReqs.file_id = fle.file_id
    LEFT JOIN Organizations org
    ON org.organizationID = uReqs.organizationID
    INNER JOIN Users users
    ON users.UserID = uReqs.UserID 
    INNER JOIN Users usr
    ON usr.UserID = uReqs.DeveloperID
WHERE uReqs.stateID>=5 AND uReqs.importanceID>=3`,
      {
        type: QueryTypes.SELECT,
      }
    )
    .then((data) => {
      res.send(data);
    });
};
exports.headReport = async (req, res) => {
  const id = req.body;
  await db.sequelize
    .query(
      `exec sp_userReqs 11,0, ${id.organizationID}`,
      {
        type: QueryTypes.SELECT,
      }
    )
    .then((data) => {
      res.send(data);
    });
};
exports.reportDetail = async (req, res) => {
  const id = req.body;
  await db.sequelize
    .query(`exec sp_userReqs 10, ${id.userReqID}, 0`, {
      type: QueryTypes.SELECT,
    })
    .then((data) => {
      res.send(data);
    });
};
