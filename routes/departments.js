const express = require('express');
const department = require('../controllers/departments');

const router = express.Router()

router.post("/", department.createOne);

router.get("/", department.findAll);

router.get("/:id", department.findOne);

router.put("/:id", department.updateOne);

router.delete("/", department.deleteAll);

router.delete("/:id", department.deleteOne);

module.exports = router
