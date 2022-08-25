import express from "express";
import asyncHandler from "express-async-handler";
import { protect, admin } from "../Middleware/AuthMiddleware.js";
import File from "../models/File";
const fileRouter = express.Router();


// GET ALL File 
fileRouter.get(
  "/files",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const files = await File.find({});
    res.json(files);
  })

  
);

export default fileRouter;
