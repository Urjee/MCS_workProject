module.exports = app => {
    const workRequests = require('../controllers/workRequestsController');

    const router = require('express').Router();

    router.get('/workRequests', workRequests.allWorkRequests);
    router.post('/addWorkRequests',workRequests.addWorkRequest);
    router.get('/addFile',workRequests.addFile);


    app.use('/api', router);
}