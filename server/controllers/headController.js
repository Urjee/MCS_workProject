const db = require("../models");
const Head = db.Head;
const { QueryTypes, Op } = require("sequelize");
const events = require("events");

exports.allHead = async (req, res) => {
  db.sequelize
    .query(
      `
    SELECT 
    [User].*,
    org.organizationName AS organizationName,
    dep.departmentName AS departmentName,
    head.firstname AS headName
    FROM
        [Users] AS [User] 
    INNER JOIN Organizations AS org 
    ON org.organizationID = [User].organizationID
    INNER JOIN Departments AS dep
    ON dep.departmentID = [User].departmentID
    LEFT JOIN Users head
    ON head.UserID = [User].headID
    WHERE
     [User].isAdmin = '3'`,
      { type: QueryTypes.SELECT }
    )
    .then((data) => {
      res.send(data);
    });
};

exports.getHead = async (req, res) => {
  const { orgID } = req.body;
  const head = await db.sequelize.query(
    `
    SELECT 
    [User].*,
    org.organizationName AS organizationName,
    dep.departmentName AS departmentName,
    head.firstname AS headName

    FROM
        [Users] AS [User] 
    INNER JOIN Organizations AS org 
    ON org.organizationID = [User].organizationID
    INNER JOIN Departments AS dep
    ON dep.departmentID = [User].departmentID
    LEFT JOIN Users head
    ON head.UserID = [User].headID
    WHERE
        [User].isAdmin = '3'
    AND
        org.organizationNam = N'${orgID}'
    `,
    { type: QueryTypes.SELECT }
  );

  if (head) {
    res.status(200).send(head);
  } else {
    res.status(400).send({ message: "Head not found" });
  }
};

exports.userReqUpdate = async (req, res) => {
  const id = req.body;
  db.sequelize
    .query(
      `
    UPDATE [dbo].UserReqs
            SET stateID = 3
            WHERE [dbo].UserReqs.userReqID = ${id.userReqID}`
    )
    .then((data) => {
      res.send(data);
    });
};
exports.userReqCancel = async (req, res) => {
  const id = req.body;
  db.sequelize
    .query(
      `
    UPDATE [dbo].UserReqs
         SET stateID = 1
         WHERE [dbo].UserReqs.userReqID = ${id.userReqID}`
    )
    .then((data) => {
      res.send(data);
    });
};

exports.headReqs = async (req, res) => {
  const UserID = req.body.UserID;
  await db.sequelize
    .query(
      `
        exec sp_userReqs 4, 0, ${UserID}`,
      { type: QueryTypes.SELECT }
    )
    .then((data) => {
      res.send(data);
    });
};

return Head;
