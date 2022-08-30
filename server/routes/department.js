module.exports = app => {
    const department = require('../controllers/departmentController');
    const router = require('express').Router();

    router.get('/department', department.allDepartment);

    app.use('/api', router);
}