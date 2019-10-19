const express = require("express");
const router = express.Router();

const Product = require("../models/product");
const Department = require("../models/department");
const Category = require("../models/category");

// PRODUCT ###############################################################

router.get("/product", async (req, res) => {
  let allProd = await Product.find().populate("category");
  res.json(allProd);
});

router.post("/product/create", async (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let price = req.body.price;
  let categoryId = req.body.category;
  try {
    const newProduct = new Product({
      title: title,
      description: description,
      price: price,
      category: categoryId
    });

    await newProduct.save();
    res.send("Product Created");
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

router.post("/product/update", async (req, res) => {
  let id = req.query.id;
  let title = req.body.title;
  let description = req.body.description;
  let price = req.body.price;
  let categoryId = req.body.category;
  let prodToUpdate = await Product.findById(id);
  if (title) {
    prodToUpdate.title = title;
  }
  if (description) {
    prodToUpdate.description = description;
  }
  if (price) {
    prodToUpdate.price = price;
  }
  if (categoryId) {
    prodToUpdate.category = categoryId;
  }
  await prodToUpdate.save();
  res.json(prodToUpdate);
});

// router.post("/product/delete", async (req, res) => {
//     let id = req.query.id;
//     let prodToDelete = await Product.findById(id);
//     // in progress
//   });

module.exports = router;
