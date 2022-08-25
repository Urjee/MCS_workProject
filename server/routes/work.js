module.exports = app => {
    const works = require('../controllers/workController');

    const router = require('express').Router();

    router.get('/works', works.allWorks);

    app.use('/api', router);
}