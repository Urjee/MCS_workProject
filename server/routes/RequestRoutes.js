import express from "express";
import asyncHandler from "express-async-handler";
import { protect, admin } from "../Middleware/AuthMiddleware.js";
import Request from "../models/Request";
const requestRouter = express.Router();

// GET ALL REQUESTS 
workRouter.get(
    "/requests",
    protect,
    admin,
    asyncHandler(async (req, res) => {
      const requests = await Request.find({});
      res.json(requests);
    })
  );
  export default requestRouter;
