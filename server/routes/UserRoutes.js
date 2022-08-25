import express from "express";
import asyncHandler from "express-async-handler";
import { protect, admin } from "../Middleware/AuthMiddleware.js";
import generateToken from "../utils/generateToken.js";
import User from "../Models/UserModel.js";

const userRouter = express.Router();

// LOGIN
userRouter.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._ID,
        email:user.email,
        password:user.password,
        token: generateToken(user.ID)
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  })
);

// REGISTER
userRouter.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._ID,
        usercode:user.usercode,
        name:user.username,
        email:user.email,
        firstname:user.firstname,
        lastname: user.lastname,
        phone:user.phone,
        address:user.address,
        job:user.job,
        organizationID:user.organizationName,
        token: generateToken(user.ID)
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);
// GET SINGLE USER
userRouter.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404);
      throw new Error("Хэрэглэгч олдсонгүй");
    }
  })
);
// PROFILE
userRouter.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._ID,
        usercode:user.usercode,
        name:user.username,
        email:user.email,
        firstname:user.firstname,
        lastname: user.lastname,
        phone:user.phone,
        address:user.address,
        job:user.job,
        organizationID:user.organizationName,
        token: generateToken(user.ID)
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// UPDATE PROFILE
userRouter.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: user._ID,
        usercode:user.usercode,
        name:user.username,
        email:user.email,
        firstname:user.firstname,
        lastname: user.lastname,
        phone:user.phone,
        address:user.address,
        job:user.job,
        organizationID:user.organizationName,
        token: generateToken(user.ID)
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// GET ALL USER ADMIN
userRouter.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);


// ADDUSER
userRouter.get(
  "/addUser",
  asyncHandler(async (req, res) => {
    const { UserID,username, password, firstname,lastname,phone,address,job, email, isAdmin, organizationID, usercode } = req.body;

    const userExists = await User.create({ UserID, username, password, firstname, lastname,phone, address, job, email, isAdmin, organizationID, usercode });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
        UserID,
        username,
        password,
        firstname,
        lastname,
        phone,
        address,
        job,
        email,
        isAdmin,
        organizationID,
        usercode,
     
    });

    if (user) {
      res.status(201).json({
        UserID: user.UserID,
        username: user.username,
        password:user.password,
        firstname:user.firstname,
        lastname: user.lastname,
        phone:user.phone,
        address:user.address,
        job:user.job,
        email:user.email,
        isAdmin:user.isAdmin,
        organizationID:user.organizationID,
        usercode: user.usercode,
        token: generateToken(user.UserID)
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);

export default userRouter;
