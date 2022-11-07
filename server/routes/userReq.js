module.exports = app => {
    const requests = require('../controllers/userReqController');

    const router = require('express').Router();

    router.post('/userReqs', requests.allUserReq);
    router.post('/headReqDetail',requests.headReqDetail);
    router.post('/requestEdit', requests.requestEdit);
    router.post('/editRequest', requests.editRequest);

    router.post('/reqAdminEdit', requests.reqAdminEdit);
    router.post('/adminReqs', requests.adminReqs);
    router.post('/adminReqsPro', requests.adminReqsPro);

    router.post('/requests', requests.allRequests);
    router.post('/requestProgrammer', requests.requestAll);
    router.post('/message', requests.message);

    router.delete('/deleteAdminReq', requests.deleteAdminReq)
    app.use('/api', router);
}