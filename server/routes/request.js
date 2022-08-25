module.exports = app => {
    const requests = require('../controllers/requestController');

    const router = require('express').Router();

    router.get('/requests', requests.allRequests);

    app.use('/api', router);
}