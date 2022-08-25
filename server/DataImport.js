import express from "express";
import User from "./Models/UserModel.js";
import users from "./data/users.js";
import Product from "./Models/ProductModel.js";
import products from "./data/Products.js";
import asyncHandler from "express-async-handler";
import Work from "./models/Work.js";
const ImportData = express.Router();

ImportData.post(
  "/user",
  asyncHandler(async (req, res) => {
    await User.remove({});
    const importUser = await User.insertMany(users);
    res.send({ importUser });
  })
);

ImportData.post(
  "/work",
  asyncHandler(async (req, res) => {
    await Work.remove({});
    const importWork = await Work.insertMany(works);
    res.send({ importWork });
  })
);
ImportData.post(
  "/workUser",
  asyncHandler(async (req, res) => {
    await WorkUser.remove({});
    const importWork = await WorkUser.insertMany(workUsers);
    res.send({ importWork });
  })
);

ImportData.post(
  "/products",
  asyncHandler(async (req, res) => {
    await Product.remove({});
    const importProducts = await Product.insertMany(products);
    res.send({ importProducts });
  })
);

export default ImportData;
