module.exports = app => {
    const importance = require('../controllers/importanceController');
    const router = require('express').Router();

    router.get('/importance', importance.allImportance);

    app.use('/api', router);
}