import express from "express";
import asyncHandler from "express-async-handler";
import { protect, admin } from "../Middleware/AuthMiddleware.js";
import Work from "../models/Work";
const workRouter = express.Router();


// GET ALL WORK 
workRouter.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const works = await Work.find({});
    res.json(works);
  })

  
);

export default workRouter;
