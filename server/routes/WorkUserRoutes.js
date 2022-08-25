import express from "express";
import asyncHandler from "express-async-handler";
import { protect, admin } from "../Middleware/AuthMiddleware.js";
import WorkUser from "../models/WorkUser";

const workUserRouter = express.Router();

// GET SINGLE workUser
workUserRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const workUser = await WorkUser.findById(req.params.id);
    if (workUser) {
      res.json(workUser);
    } else {
      res.status(404);
      throw new Error("Ажлын хүсэлт олдсонгүй");
    }
  })
);
// GET ALL WORKUSER 
workUserRouter.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const workUsers = await WorkUser.find({});
    res.json(workUsers);
  })
);
// ADDWORKUSER
workUserRouter.get(
  "/addWorkUser",
  asyncHandler(async (req, res) => {
    const { workUser_id, name, organizationID, importance_id, planTime, file} = req.body;

    const workExists = await WorkUser.create({workUser_id, name, organizationID, subWorkID, importance_id, planTime, file });

    if (workExists) {
      res.status(400);
      throw new Error("Ийм нэртэй ажил даалгавар аль хэдийн үүссэн байна!!!");
    }

    const workUser = await WorkUser.create({
        workUser_id,
        name,
        organizationID,
        subWorkID,
        importance_id,
        planTime,
        file,  
    });

    if (workUser) {
      res.status(201).json({
        workUser_id: workUser.workUser_id,
        name:workUser.name,
        organizationID:workUser.organizationID,
        subWorkID:workUser.subWorkID,
        importance_id:workUser.importance_id,
        planTime: workUser.planTime,
        file:workUser.file,
        token: generateToken(workUser.workUser_id)
      });
    } else {
      res.status(400);
      throw new Error("Invalid WorkUser Data");
    }
  })
);
export default workUserRouter;
