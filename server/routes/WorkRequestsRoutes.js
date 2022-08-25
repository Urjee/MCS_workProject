import express from "express";
import asyncHandler from "express-async-handler";
import { protect, admin } from "../Middleware/AuthMiddleware.js";
import WorkRequests from "../models/WorkRequest";
const workRequestRouter = express.Router();


// GET ALL WORK 
workRequestRouter.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const workRequests = await WorkRequests.find({});
    res.json(workRequests);
  })

  
);
// ADD WORKREQUESTS
workRequestRouter.get(
  "/addWorkRequests",
  asyncHandler(async (req, res) => {
    const {workRequest_id, name, organizationID, subWorkID , importanceID, planTime, file_id, description} = req.body;

    const workRequestExists = await WorkRequests.create({ workRequest_id, name, organizationID, subWorkID , importanceID, planTime, file_id, description });

    if (workRequestExists) {
      res.status(400);
      throw new Error("Өмнө үүссэн ажил даалгавар байна!");
    }

    const workRequest = await WorkRequests.create({
      workRequest_id,
      name,
      organizationID,
      subWorkID,
      importanceID,
      planTime,
      file_id,
      description
     
    });

    if (workRequest) {
      res.status(201).json({
        workRequest_id: workRequest.workRequest_id,
        name: workRequest.name,
        organizationID:workRequest.organizationID,
        subWorkID:workRequest.subWorkID,
        importanceID: workRequest.importanceID,
        planTime:workRequest.planTime,
        file_id:workRequest.file_id,
        description:workRequest.description,
        token: generateToken(workRequest.workRequest_id)
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);
// GET ALL FILE 
workRequestRouter.get(
  "/addFile",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const files = await files.find({});
    res.json(files);
  })

  
);
export default workRequestRouter;
