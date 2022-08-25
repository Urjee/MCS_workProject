module.exports = app => {
    const requests = require('../controllers/userReqController');

    const router = require('express').Router();

    router.get('/userReqs', requests.allProducts);
    router.post('/addUserReq', requests.addUserReq);

    app.use('/api', router);
}