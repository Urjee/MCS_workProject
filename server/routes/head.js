module.exports = app => {
    const head = require('../controllers/headController');
    const router = require('express').Router();

    router.get('/head', head.allHead);
    router.post('/getHead', head.getHead);
    router.post('/userReqUpdate', head.userReqUpdate);
    router.post('/userReqCancel', head.userReqCancel);
    router.post('/headReqs', head.headReqs);

    app.use('/api', router);
}