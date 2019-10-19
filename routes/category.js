const express = require("express");
const router = express.Router();

const Product = require("../models/product");
const Department = require("../models/department");
const Category = require("../models/category");

// CATEGORY ###############################################################

// READ
router.get("/category", async (req, res) => {
  let allCat = await Category.find().populate("department");
  res.json(allCat);
});

// CREATE
router.post("/category/create", async (req, res) => {
  let title = req.body.title;
  let description = req.body.description;
  let departmentId = req.body.department;
  try {
    const newCategory = new Category({
      title: title,
      description: description,
      department: departmentId
    });

    await newCategory.save();
    res.send("Category Created");
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

// UPDATE
router.post("/category/update", async (req, res) => {
  let id = req.query.id;
  let title = req.body.title;
  let description = req.body.description;
  let departmentId = req.body.department;
  let catToUpdate = await Category.findById(id);
  if (title) {
    catToUpdate.title = title;
  }
  if (description) {
    catToUpdate.description = description;
  }
  if (departmentId) {
    catToUpdate.department = departmentId;
  }
  await catToUpdate.save();
  res.json(catToUpdate);
});

// DELETE
// router.post("/category/delete", async (req, res) => {
//     let id = req.query.id;
//     let catToDelete = await Category.findById(id);
//     // in progress
//   });

module.exports = router;