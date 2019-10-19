const express = require("express");
const router = express.Router();

const Product = require("../models/product");
const Department = require("../models/department");
const Category = require("../models/category");

// DEPARTMENT ###############################################################

router.get("/department", async (req, res) => {
  let allDept = await Department.find();
  res.json(allDept);
});

router.post("/department/create", async (req, res) => {
  let title = req.body.title;
  try {
    const newDepartment = new Department({
      title: title
    });
    await newDepartment.save();
    res.send("Department Created");
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
});

router.post("/department/update", async (req, res) => {
  let id = req.query.id;
  let title = req.body.title;
  let deptToUpdate = await Department.findById(id);
  deptToUpdate.title = title;
  await deptToUpdate.save();
  res.json(deptToUpdate);
});

// router.post("/department/delete", async (req, res) => {
//     let id = req.query.id;
//     let deptToDelete = await Department.findById(id);
//     // in progress
//   });

module.exports = router;
