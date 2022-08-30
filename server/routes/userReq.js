module.exports = app => {
    const requests = require('../controllers/userReqController');

    const router = require('express').Router();

    router.get('/userReqs', requests.allUserReq);
    router.post('/addUserReq', requests.addUserReq);
    router.post('/userReqApproved', requests.userReqApproved);
    router.post('/getAdminReqs', requests.getAdminReqs);
    router.post('/workRequestClose', requests.workRequestClose);
    router.post('/userReqsuser', requests.allProductsuser);

    app.use('/api', router);
}