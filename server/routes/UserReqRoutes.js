import express from "express";
import asyncHandler from "express-async-handler";
import { protect, admin } from "../Middleware/AuthMiddleware.js";
import UserReq from "../models/UserReq";
const userReqRouter = express.Router();

// GET ALL REQUESTS 
userReqRouter.get(
    "/userReqs",
    protect,
    admin,
    asyncHandler(async (req, res) => {
      const requests = await UserReq.find({});
      res.json(requests);
    })
  );


// ADDUSERREQ
userReqRouter.post(
  "/addUserReq",
  asyncHandler(async (req, res) => {
    const { name, organizationID, importanceID, planTime, file_id, description } = req.body;

    const userExists = await UserReq.create({  name, organizationID, importanceID, planTime, file_id, description });

    if (userExists) {
      res.status(400);
      throw new Error("UserRequest already exists");
    }

    const request = await UserReq.create({
       name,
       organizationID, 
       importanceID,
       planTime,
       file_id,
       description
     
    });

    if (request) {
      res.status(201).json({
        name: request.name,
        organizationID:request.organizationID,
        importanceID: request.importanceID,
        planTime: request.planTime,
        file_id: request.file_id,
        description: request.description,
        token: generateToken(request.userReqID)
      });
    } else {
      res.status(400);
      throw new Error("Invalid UserRequest Data");
    }
  })
);
userReqRouter.post(
  "/userReqApproved",
  asyncHandler(async(req, res)=>{
    const { name, description, planTime, organizationID, file_id, importanceID, UserID, userReqID } = req.body;

    const userExists = await UserReq.create({  name, organizationID, importanceID, planTime, file_id, description });

    if (userExists) {
      res.status(400);
      throw new Error("UserRequest already exists");
    }

    const request = await UserReq.create({
       name,
       organizationID, 
       importanceID,
       planTime,
       file_id,
       description
     
    });

    if (request) {
      res.status(201).json({
        name: request.name,
        organizationID:request.organizationID,
        importanceID: request.importanceID,
        planTime: request.planTime,
        file_id: request.file_id,
        description: request.description,
        token: generateToken(request.userReqID)
      });
    } else {
      res.status(400);
      throw new Error("Invalid UserRequest Data");
    }
    })
)
//GET SINGLE USERREQ BY ID
userReqRouter.put(
  "/:id",
  protect,
  asyncHandler(async (req, res)=>{
    const {name, organizationID, importanceID, planTime, file_id, description }=req.body;
    const request=await UserReq.findById(req.params.id);
  if(request){
    request.name=name;
    request.organizationID=organizationID;
    request.importanceID=importanceID;
    request.planTime=planTime;
    request.file_id=file_id;
    request.description=description;

    const userReqDetail= await request.save();
    res.json(userReqDetail);
  } else {
    res.status(404);
    throw new Error("UserReq not Found");
  }
  })
);

// // USERREQ REVIEW
// userReqRouter.post(
//   "/:id/review",
//   protect,
//   asyncHandler(async (req, res) => {
//     const {  comment } = req.body;
//     const request = await UserReq.findById(req.params.id);

//     if (product) {
//       const alreadyReviewed = product.reviews.find(
//         (r) => r.user.toString() === req.user._id.toString()
//       );
//       if (alreadyReviewed) {
//         res.status(400);
//         throw new Error("Product already Reviewed");
//       }
//       const review = {
//         name: req.user.name,
//         comment,
//         user: req.users.UserID,
//       };

//       product.reviews.push(review);
//       product.numReviews = product.reviews.length;
//       product.rating =
//         product.reviews.reduce((acc, item) => item.rating + acc, 0) /
//         product.reviews.length;

//       await product.save();
//       res.status(201).json({ message: "Reviewed Added" });
//     } else {
//       res.status(404);
//       throw new Error("Product not Found");
//     }
//   })
// );
  export default userReqRouter;
