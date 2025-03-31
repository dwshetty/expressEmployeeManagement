const express = require('express');
const employeeRoutes = require('./employees')
const departmentRoutes = require('./departments')

const router = express.Router()

router.use('/employees', employeeRoutes)

router.use('/departments', departmentRoutes)

router.use('/', (req, res) => {
    res.render('index', { error: null });
})

module.exports = router
