const express = require('express');
const employee = require('../controllers/employees');

const router = express.Router()

router.post("/", employee.createOne);

router.get("/", employee.findAll);

router.get("/:id", employee.findOne);

router.put("/:id", employee.updateOne);

router.delete("/", employee.deleteAll);

router.delete("/:id", employee.deleteOne);

module.exports = router
